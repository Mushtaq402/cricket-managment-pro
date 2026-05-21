/* ============================================
   CRICKET MANAGEMENT PRO - MAIN JAVASCRIPT
   ============================================ */

// ============ STORAGE KEYS ============
const STORAGE_TOURNAMENTS = 'cmp_tournaments';
const STORAGE_PLAYERS = 'cmp_players';
const STORAGE_MATCHES = 'cmp_matches';

// ============ GLOBAL STATE ============
let currentView = 'dashboard';
let currentTournament = null;
let currentMatch = null;
let playerPhotoData = null;
let scoreHistory = [];

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  loadAllData();
  navigateTo('dashboard');
});

// ============ NAVIGATION ============
function navigateTo(view) {
  // Hide all sections
  document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active-view'));
  
  // Show selected section
  const section = document.getElementById(`view-${view}`);
  if (section) {
    section.classList.add('active-view');
  }
  
  // Update nav items
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  const navItem = document.getElementById(`nav-${view}`);
  if (navItem) {
    navItem.classList.add('active');
  }
  
  currentView = view;
  
  // Refresh view-specific data
  if (view === 'dashboard') {
    refreshDashboard();
  } else if (view === 'tournaments') {
    refreshTournamentsList();
  } else if (view === 'players') {
    refreshPlayersDirectory();
  } else if (view === 'history') {
    refreshMatchHistory();
  } else if (view === 'tournament-detail') {
    refreshTournamentDetail();
  }
}

// ============ MODAL MANAGEMENT ============
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}

// ============ PHOTO UPLOAD & COMPRESSION ============
function previewPlayerPhoto() {
  const fileInput = document.getElementById('add-p-photo');
  const file = fileInput.files[0];
  
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      // Compress image using canvas
      const canvas = document.createElement('canvas');
      const maxWidth = 200;
      const maxHeight = 200;
      let width = img.width;
      let height = img.height;
      
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      
      // Store compressed Base64
      playerPhotoData = canvas.toDataURL('image/jpeg', 0.8);
      
      // Show preview
      const preview = document.getElementById('photo-preview-box');
      preview.innerHTML = `<img src="${playerPhotoData}" alt="Player Photo">`;
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// ============ PLAYER MANAGEMENT ============
function saveNewPlayer() {
  const name = document.getElementById('add-p-name').value.trim();
  const role = document.getElementById('add-p-role').value;
  const batting = document.getElementById('add-p-batting').value;
  const bowling = document.getElementById('add-p-bowling').value;
  const bio = document.getElementById('add-p-bio').value.trim();
  
  if (!name) {
    alert('Please enter player name');
    return;
  }
  
  const players = loadPlayers();
  const newPlayer = {
    id: Date.now(),
    name,
    role,
    batting,
    bowling,
    bio,
    photo: playerPhotoData,
    team: '',
    stats: {
      matches: 0,
      runs: 0,
      balls: 0,
      fours: 0,
      sixes: 0,
      strikeRate: 0,
      wickets: 0,
      overs: 0,
      maidens: 0,
      bowlRuns: 0,
      economy: 0,
      average: 0,
      milestones: { thirties: 0, fifties: 0, seventies: 0, hundreds: 0 }
    }
  };
  
  players.push(newPlayer);
  savePlayers(players);
  
  // Reset form
  document.getElementById('add-p-name').value = '';
  document.getElementById('add-p-bio').value = '';
  document.getElementById('photo-preview-box').innerHTML = '<i data-lucide="camera"></i><p>Click to upload photo</p>';
  playerPhotoData = null;
  
  closeModal('modal-add-player');
  lucide.createIcons();
  refreshPlayersDirectory();
}

function openAddPlayerModalGlobal() {
  playerPhotoData = null;
  document.getElementById('add-p-name').value = '';
  document.getElementById('add-p-bio').value = '';
  document.getElementById('photo-preview-box').innerHTML = '<i data-lucide="camera"></i><p>Click to upload photo</p>';
  openModal('modal-add-player');
  lucide.createIcons();
}

// ============ PLAYERS DIRECTORY ============
function refreshPlayersDirectory() {
  const players = loadPlayers();
  const container = document.getElementById('players-grouped-container');
  const tbody = document.getElementById('players-directory-tbody');
  
  if (players.length === 0) {
    container.innerHTML = '<div class="empty-state"><i data-lucide="users"></i><p>No players registered yet</p></div>';
    tbody.innerHTML = '<tr><td colspan="9" class="empty-state">No players registered yet</td></tr>';
    lucide.createIcons();
    return;
  }
  
  // Group players by team
  const grouped = {};
  players.forEach(p => {
    const team = p.team || 'Unassigned';
    if (!grouped[team]) grouped[team] = [];
    grouped[team].push(p);
  });
  
  // Render grouped view
  let html = '';
  Object.entries(grouped).forEach(([team, teamPlayers]) => {
    html += `
      <div class="glass-card">
        <div class="team-roster-header">
          <h3>🏏 ${team}</h3>
          <span class="player-count">${teamPlayers.length} players</span>
        </div>
        <div class="team-roster-players">
          ${teamPlayers.map(p => `
            <div class="player-card" onclick="showPlayerProfile(${p.id})">
              <div class="player-photo">
                ${p.photo ? `<img src="${p.photo}" alt="${p.name}">` : '<i data-lucide="user"></i>'}
              </div>
              <div class="player-name">${p.name}</div>
              <div class="player-role">${p.role}</div>
              <div class="player-stats">
                <div class="player-stat">
                  <span class="player-stat-value">${p.stats.matches}</span>
                  <span>Matches</span>
                </div>
                <div class="player-stat">
                  <span class="player-stat-value">${p.stats.runs}</span>
                  <span>Runs</span>
                </div>
                <div class="player-stat">
                  <span class="player-stat-value">${p.stats.wickets}</span>
                  <span>Wkts</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
  
  // Also populate table view
  tbody.innerHTML = players.map(p => `
    <tr onclick="showPlayerProfile(${p.id})">
      <td>
        <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #6c5dd3, #ff6b6b); display: flex; align-items: center; justify-content: center; overflow: hidden;">
          ${p.photo ? `<img src="${p.photo}" style="width: 100%; height: 100%; object-fit: cover;">` : '<i data-lucide="user" style="width: 16px; height: 16px;"></i>'}
        </div>
      </td>
      <td>${p.name}</td>
      <td>${p.team || '-'}</td>
      <td>${p.role}</td>
      <td>${p.stats.matches}</td>
      <td>${p.stats.runs}</td>
      <td>${p.stats.wickets}</td>
      <td>${p.stats.matches > 0 ? (p.stats.runs / p.stats.matches).toFixed(1) : '0.0'}</td>
      <td>${p.stats.economy.toFixed(2)}</td>
    </tr>
  `).join('');
  
  lucide.createIcons();
}

function filterPlayersDirectory() {
  const searchTerm = document.getElementById('player-search-bar').value.toLowerCase();
  const players = loadPlayers();
  const filtered = players.filter(p => 
    p.name.toLowerCase().includes(searchTerm) || 
    (p.team && p.team.toLowerCase().includes(searchTerm))
  );
  
  // Update display with filtered results
  const tbody = document.getElementById('players-directory-tbody');
  tbody.innerHTML = filtered.map(p => `
    <tr onclick="showPlayerProfile(${p.id})">
      <td>
        <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #6c5dd3, #ff6b6b); display: flex; align-items: center; justify-content: center; overflow: hidden;">
          ${p.photo ? `<img src="${p.photo}" style="width: 100%; height: 100%; object-fit: cover;">` : '<i data-lucide="user" style="width: 16px; height: 16px;"></i>'}
        </div>
      </td>
      <td>${p.name}</td>
      <td>${p.team || '-'}</td>
      <td>${p.role}</td>
      <td>${p.stats.matches}</td>
      <td>${p.stats.runs}</td>
      <td>${p.stats.wickets}</td>
      <td>${p.stats.matches > 0 ? (p.stats.runs / p.stats.matches).toFixed(1) : '0.0'}</td>
      <td>${p.stats.economy.toFixed(2)}</td>
    </tr>
  `).join('');
}

function showPlayerProfile(playerId) {
  const players = loadPlayers();
  const player = players.find(p => p.id === playerId);
  if (!player) return;
  
  // Populate modal
  document.getElementById('prof-modal-name').textContent = player.name;
  document.getElementById('prof-modal-team').textContent = player.team || 'Unassigned';
  document.getElementById('prof-modal-role').textContent = player.role;
  document.getElementById('prof-modal-style').textContent = `${player.batting} / ${player.bowling}`;
  document.getElementById('prof-modal-bio').textContent = player.bio || 'No bio available';
  
  // Avatar
  const avatar = document.getElementById('prof-modal-avatar');
  if (player.photo) {
    avatar.innerHTML = `<img src="${player.photo}" style="width: 100%; height: 100%; object-fit: cover;">`;
  } else {
    avatar.innerHTML = '<i data-lucide="user" style="width: 48px; height: 48px;"></i>';
  }
  
  // Stats
  document.getElementById('prof-modal-bat-mat').textContent = player.stats.matches;
  document.getElementById('prof-modal-bat-runs').textContent = player.stats.runs;
  const batAvg = player.stats.matches > 0 ? (player.stats.runs / player.stats.matches).toFixed(1) : '0.0';
  const sr = player.stats.balls > 0 ? ((player.stats.runs / player.stats.balls) * 100).toFixed(0) : '0';
  document.getElementById('prof-modal-bat-avg-sr').textContent = `${batAvg} / ${sr}`;
  
  // Milestones
  const milestones = player.stats.milestones;
  let milestonesHtml = '';
  if (milestones.thirties > 0) milestonesHtml += `<span class="cap-badge cap-orange">30+ (${milestones.thirties})</span>`;
  if (milestones.fifties > 0) milestonesHtml += `<span class="cap-badge cap-orange">50+ (${milestones.fifties})</span>`;
  if (milestones.seventies > 0) milestonesHtml += `<span class="cap-badge cap-orange">70+ (${milestones.seventies})</span>`;
  if (milestones.hundreds > 0) milestonesHtml += `<span class="cap-badge cap-orange">100+ (${milestones.hundreds})</span>`;
  document.getElementById('prof-modal-milestones-row').innerHTML = milestonesHtml || '<span style="color: var(--text-muted);">No milestones yet</span>';
  
  // Bowling
  document.getElementById('prof-modal-bowl-wkts').textContent = player.stats.wickets;
  document.getElementById('prof-modal-bowl-econ-avg').textContent = `${player.stats.economy.toFixed(2)} / ${player.stats.average.toFixed(1)}`;
  document.getElementById('prof-modal-bowl-overs').textContent = player.stats.overs.toFixed(1);
  
  openModal('modal-player-profile');
  lucide.createIcons();
}

// ============ LIVE STREAM HANDLERS ============
function loadStreamURL() {
  const url = document.getElementById('stream-url-input').value.trim();
  if (!url) {
    alert('Please enter a stream URL');
    return;
  }
  
  const videoContainer = document.getElementById('live-stream-video');
  
  // Check if it's a YouTube URL
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = extractYouTubeId(url);
    videoContainer.innerHTML = `
      <iframe 
        width="100%" 
        height="100%" 
        src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    `;
  } else {
    // Treat as generic RTMP/stream URL
    videoContainer.innerHTML = `
      <video width="100%" height="100%" controls style="background: #000;">
        <source src="${url}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    `;
  }
}

function extractYouTubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
}

function toggleSimulatedBroadcast() {
  const videoContainer = document.getElementById('live-stream-video');
  videoContainer.innerHTML = `
    <div class="broadcast-placeholder">
      <i data-lucide="video" style="width: 48px; height: 48px; opacity: 0.5;"></i>
      <p>Simulated Broadcast Feed</p>
      <div class="live-indicator">
        <span class="live-dot"></span>
        <span>LIVE</span>
      </div>
      <div style="margin-top: 16px; font-size: 12px; color: var(--text-secondary);">
        <p>Score: 45/2 (6.3 overs)</p>
        <p>Bowler Speed: 138 km/h</p>
      </div>
    </div>
  `;
  lucide.createIcons();
}

// ============ CREASE DETAILS FIX ============
function updateCreaseDetails() {
  if (!currentMatch || !currentMatch.currentInning) return;
  
  const inn = currentMatch.currentInning;
  const tbody = document.getElementById('score-crease-tbody');
  
  if (!inn.batsmen || inn.batsmen.length < 2) return;
  
  const striker = inn.batsmen[inn.strikerIdx];
  const nonStriker = inn.batsmen[inn.nonStrikerIdx];
  
  const strikerSR = striker.balls > 0 ? ((striker.runs / striker.balls) * 100).toFixed(0) : 0;
  const nonStrikerSR = nonStriker.balls > 0 ? ((nonStriker.runs / nonStriker.balls) * 100).toFixed(0) : 0;
  
  tbody.innerHTML = `
    <tr style="background: rgba(108, 93, 211, 0.1);">
      <td><strong>${striker.name}</strong> (Striker)</td>
      <td>${striker.runs}</td>
      <td>${striker.balls}</td>
      <td>${striker.fours}</td>
      <td>${striker.sixes}</td>
      <td>${strikerSR}</td>
    </tr>
    <tr>
      <td>${nonStriker.name}</td>
      <td>${nonStriker.runs}</td>
      <td>${nonStriker.balls}</td>
      <td>${nonStriker.fours}</td>
      <td>${nonStriker.sixes}</td>
      <td>${nonStrikerSR}</td>
    </tr>
  `;
}

function changeCreaseStriker() {
  if (!currentMatch || !currentMatch.currentInning) return;
  
  const strikerSelect = document.getElementById('score-striker-select');
  const newStrikerName = strikerSelect.value;
  const inn = currentMatch.currentInning;
  
  const newStrikerIdx = inn.batsmen.findIndex(b => b.name === newStrikerName);
  if (newStrikerIdx !== -1) {
    inn.strikerIdx = newStrikerIdx;
    inn.nonStrikerIdx = inn.batsmen.findIndex((b, i) => i !== newStrikerIdx);
    updateCreaseDetails();
  }
}

// ============ SCORING FUNCTIONS ============
function scoreBall(runs) {
  if (!currentMatch || !currentMatch.currentInning) return;
  
  const inn = currentMatch.currentInning;
  const striker = inn.batsmen[inn.strikerIdx];
  
  // Add to score history for undo
  scoreHistory.push(JSON.parse(JSON.stringify(inn)));
  
  striker.runs += runs;
  striker.balls++;
  
  if (runs === 4) striker.fours++;
  if (runs === 6) striker.sixes++;
  
  inn.totalRuns += runs;
  inn.legalBalls++;
  
  // Add to current over
  if (!inn.currentOver) inn.currentOver = [];
  inn.currentOver.push(runs);
  
  // Swap ends if odd runs
  if (runs % 2 === 1) {
    [inn.strikerIdx, inn.nonStrikerIdx] = [inn.nonStrikerIdx, inn.strikerIdx];
  }
  
  // Check if over is complete
  if (inn.legalBalls % 6 === 0) {
    inn.completedOvers.push([...inn.currentOver]);
    inn.currentOver = [];
  }
  
  updateCreaseDetails();
  updateLiveScore();
  updateCurrentOverDisplay();
  saveCurrentMatch();
}

function scoreExtra(type) {
  if (!currentMatch || !currentMatch.currentInning) return;
  
  const inn = currentMatch.currentInning;
  // Map type names to their HTML element IDs
  const idMap = { 'Wide': 'score-wide-runs', 'NoBall': 'score-noball-runs', 'Bye': 'score-byes-runs', 'LegBye': 'score-legbyes-runs' };
  const runsSelect = document.getElementById(idMap[type] || `score-${type.toLowerCase()}-runs`);
  const runs = parseInt(runsSelect.value) || 1;
  
  // Add to score history
  scoreHistory.push(JSON.parse(JSON.stringify(inn)));
  
  inn.totalRuns += runs;
  
  // Extras don't count as legal balls
  if (!inn.extras) inn.extras = {};
  inn.extras[type] = (inn.extras[type] || 0) + runs;
  
  // Add to current over (but not as legal ball)
  if (!inn.currentOver) inn.currentOver = [];
  inn.currentOver.push(`${type}(${runs})`);
  
  updateLiveScore();
  updateCurrentOverDisplay();
  saveCurrentMatch();
}

function updateLiveScore() {
  if (!currentMatch || !currentMatch.currentInning) return;
  
  const inn = currentMatch.currentInning;
  document.getElementById('score-live-total').textContent = `${inn.totalRuns}/${inn.totalWkts}`;
  
  const overs = Math.floor(inn.legalBalls / 6);
  const balls = inn.legalBalls % 6;
  document.getElementById('score-live-overs').textContent = `${overs}.${balls} Overs`;
  
  const rr = inn.legalBalls > 0 ? (inn.totalRuns / (inn.legalBalls / 6)).toFixed(2) : '0.00';
  document.getElementById('score-live-rr').textContent = rr;
}

function updateCurrentOverDisplay() {
  if (!currentMatch || !currentMatch.currentInning) return;
  
  const inn = currentMatch.currentInning;
  const ballsRow = document.getElementById('score-current-over-balls');
  
  if (!inn.currentOver || inn.currentOver.length === 0) {
    ballsRow.innerHTML = '<span style="font-size: 13px; color: var(--text-muted)">Waiting for first ball...</span>';
    return;
  }
  
  const ballsHtml = inn.currentOver.map((ball, idx) => {
    const isExtra = typeof ball === 'string';
    const ballValue = isExtra ? ball : ball;
    return `<span style="display: inline-block; width: 32px; height: 32px; border-radius: 50%; background: ${isExtra ? 'rgba(255,107,107,0.2)' : 'rgba(108,93,211,0.2)'}; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px;">${ballValue}</span>`;
  }).join('');
  
  ballsRow.innerHTML = ballsHtml;
}

function undoScoreAction() {
  if (scoreHistory.length === 0) {
    alert('No actions to undo');
    return;
  }
  
  currentMatch.currentInning = scoreHistory.pop();
  updateCreaseDetails();
  updateLiveScore();
  updateCurrentOverDisplay();
  saveCurrentMatch();
}

function confirmEndInnings() {
  if (!currentMatch) return;
  
  if (confirm('Are you sure you want to end this innings?')) {
    currentMatch.currentInning.isComplete = true;
    saveCurrentMatch();
    alert('Innings ended. Ready for next innings.');
  }
}

function triggerWicketModal() {
  if (!currentMatch || !currentMatch.currentInning) return;
  
  const inn = currentMatch.currentInning;
  const batsmen = inn.batsmen.filter(b => !b.dismissed);
  
  const select = document.getElementById('wkt-batsman-out-select');
  select.innerHTML = batsmen.map(b => `<option value="${b.name}">${b.name}</option>`).join('');
  
  openModal('modal-wicket-details');
}

function saveWicketAction() {
  if (!currentMatch || !currentMatch.currentInning) return;
  
  const inn = currentMatch.currentInning;
  const batsmanName = document.getElementById('wkt-batsman-out-select').value;
  const dismissalType = document.getElementById('wkt-dismissal-type-select').value;
  
  const batsman = inn.batsmen.find(b => b.name === batsmanName);
  if (!batsman) return;
  
  batsman.dismissed = true;
  batsman.dismissal = dismissalType;
  inn.totalWkts++;
  
  // Add next batsman
  const nextBatsman = inn.batsmen.find(b => !b.dismissed);
  if (nextBatsman) {
    inn.strikerIdx = inn.batsmen.indexOf(nextBatsman);
  }
  
  updateCreaseDetails();
  updateLiveScore();
  saveCurrentMatch();
  closeModal('modal-wicket-details');
}

// ============ TOURNAMENT MANAGEMENT ============
function saveNewTournament() {
  const name = document.getElementById('add-t-name').value.trim();
  const venue = document.getElementById('add-t-venue').value.trim();
  const overs = document.getElementById('add-t-overs').value;
  
  if (!name || !venue) {
    alert('Please fill in all fields');
    return;
  }
  
  const tournaments = loadTournaments();
  const newTournament = {
    id: Date.now(),
    name,
    venue,
    overs: parseInt(overs),
    teams: [],
    matches: [],
    standings: []
  };
  
  tournaments.push(newTournament);
  saveTournaments(tournaments);
  
  document.getElementById('add-t-name').value = '';
  document.getElementById('add-t-venue').value = '';
  closeModal('modal-add-tournament');
  refreshTournamentsList();
}

function saveNewTeam() {
  if (!currentTournament) return;
  
  const teamName = document.getElementById('add-team-name').value.trim();
  if (!teamName) {
    alert('Please enter team name');
    return;
  }
  
  currentTournament.teams.push({
    id: Date.now(),
    name: teamName,
    players: [],
    matches: 0,
    wins: 0,
    losses: 0,
    points: 0
  });
  
  const tournaments = loadTournaments();
  const idx = tournaments.findIndex(t => t.id === currentTournament.id);
  if (idx !== -1) {
    tournaments[idx] = currentTournament;
    saveTournaments(tournaments);
  }
  
  document.getElementById('add-team-name').value = '';
  closeModal('modal-add-team');
  refreshTournamentDetail();
}

function saveScheduledMatch() {
  if (!currentTournament) return;
  
  const teamA = document.getElementById('schedule-teamA-select').value;
  const teamB = document.getElementById('schedule-teamB-select').value;
  
  if (!teamA || !teamB || teamA === teamB) {
    alert('Please select two different teams');
    return;
  }
  
  currentTournament.matches.push({
    id: Date.now(),
    teamA,
    teamB,
    status: 'scheduled',
    date: new Date().toLocaleDateString()
  });
  
  const tournaments = loadTournaments();
  const idx = tournaments.findIndex(t => t.id === currentTournament.id);
  if (idx !== -1) {
    tournaments[idx] = currentTournament;
    saveTournaments(tournaments);
  }
  
  closeModal('modal-schedule-match');
  refreshTournamentDetail();
}

function refreshTournamentDetail() {
  if (!currentTournament) return;
  
  document.getElementById('tdetail-name').textContent = currentTournament.name;
  document.getElementById('tdetail-meta').textContent = `${currentTournament.venue} • ${currentTournament.overs} Overs`;
  
  // Populate standings
  const standingsTbody = document.getElementById('tdetail-standings-tbody');
  standingsTbody.innerHTML = currentTournament.teams.map((team, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td>${team.name}</td>
      <td>${team.matches}</td>
      <td>${team.wins}</td>
      <td>${team.losses}</td>
      <td>0</td>
      <td>0</td>
      <td>0.00</td>
      <td>${team.points}</td>
    </tr>
  `).join('');
  
  // Populate teams list
  const teamsList = document.getElementById('tdetail-teams-ul');
  teamsList.innerHTML = currentTournament.teams.map(team => `
    <li class="nav-item" onclick="selectTeamRoster('${team.name}')">
      <a>${team.name}</a>
    </li>
  `).join('');
}

function selectTeamRoster(teamName) {
  if (!currentTournament) return;
  
  const team = currentTournament.teams.find(t => t.name === teamName);
  if (!team) return;
  
  document.getElementById('tdetail-team-roster-title').textContent = `${teamName} Roster`;
  
  const tbody = document.getElementById('tdetail-roster-tbody');
  if (!team.players || team.players.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" class="empty-state">No players in this team yet</td></tr>';
    return;
  }
  
  const players = loadPlayers();
  tbody.innerHTML = team.players.map(playerId => {
    const player = players.find(p => p.id === playerId);
    if (!player) return '';
    return `
      <tr>
        <td>${player.name}</td>
        <td>${player.role}</td>
        <td>${player.batting}</td>
        <td>${player.bowling}</td>
      </tr>
    `;
  }).join('');
}

// ============ DASHBOARD ============
function refreshDashboard() {
  const tournaments = loadTournaments();
  const players = loadPlayers();
  const matches = loadMatches();
  
  document.getElementById('dash-tourneys-count').textContent = tournaments.length;
  document.getElementById('dash-players-count').textContent = players.length;
  document.getElementById('dash-matches-count').textContent = matches.length;
}

// ============ TOURNAMENTS ============
function refreshTournamentsList() {
  const tournaments = loadTournaments();
  const container = document.getElementById('tournaments-list');
  
  if (tournaments.length === 0) {
    container.innerHTML = '<div class="empty-state"><i data-lucide="award"></i><p>No tournaments created yet</p></div>';
    lucide.createIcons();
    return;
  }
  
  container.innerHTML = tournaments.map(t => `
    <div class="glass-card" onclick="viewTournamentDetail(${t.id})">
      <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 8px;">${t.name}</h3>
      <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 12px;">${t.venue}</p>
      <div style="display: flex; justify-content: space-between; font-size: 12px;">
        <span>Teams: ${t.teams.length}</span>
        <span>Overs: ${t.overs}</span>
      </div>
    </div>
  `).join('');
  
  lucide.createIcons();
}

function viewTournamentDetail(tourneyId) {
  currentTournament = loadTournaments().find(t => t.id === tourneyId);
  if (currentTournament) {
    navigateTo('tournament-detail');
  }
}

// ============ MATCH HISTORY ============
function refreshMatchHistory() {
  const matches = loadMatches();
  const container = document.getElementById('history-match-list');
  
  if (matches.length === 0) {
    container.innerHTML = '<div class="empty-state"><i data-lucide="history"></i><p>No matches recorded yet</p></div>';
    lucide.createIcons();
    return;
  }
  
  container.innerHTML = matches.map(m => `
    <div class="glass-card" onclick="viewMatchDetail(${m.id})">
      <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 8px;">${m.teamA} vs ${m.teamB}</h3>
      <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 12px;">${m.date}</p>
      <div style="font-size: 13px; font-weight: 600; color: var(--accent);">${m.result}</div>
    </div>
  `).join('');
  
  lucide.createIcons();
}

function viewMatchDetail(matchId) {
  currentMatch = loadMatches().find(m => m.id === matchId);
  if (currentMatch) {
    navigateTo('match-center');
  }
}

// ============ LIVE SCORER SETUP ============
function toggleSetupMatchSelects() {
  const type = document.getElementById('score-match-type').value;
  const fields = document.getElementById('setup-tournament-fields');
  fields.style.display = type === 'tournament' ? 'block' : 'none';
}

function addScorerPlayerInput(team) {
  const container = document.getElementById(`scorer-players-list-${team}`);
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Player name';
  input.className = 'form-group';
  input.style.padding = '8px 12px';
  input.style.background = 'rgba(255, 255, 255, 0.05)';
  input.style.border = '1px solid rgba(108, 93, 211, 0.2)';
  input.style.borderRadius = '6px';
  input.style.color = 'white';
  container.appendChild(input);
}

function launchScorecard() {
  const teamA = document.getElementById('score-teamA-name').value.trim();
  const teamB = document.getElementById('score-teamB-name').value.trim();
  const overs = parseInt(document.getElementById('score-overs-select').value);
  
  if (!teamA || !teamB) {
    alert('Please enter both team names');
    return;
  }
  
  // Create match object
  const match = {
    id: Date.now(),
    teamA,
    teamB,
    overs,
    date: new Date().toLocaleDateString(),
    innings: [
      {
        team: teamA,
        batsmen: [],
        bowlers: [],
        totalRuns: 0,
        totalWkts: 0,
        legalBalls: 0,
        strikerIdx: 0,
        nonStrikerIdx: 1,
        currentOver: [],
        completedOvers: [],
        extras: {},
        isComplete: false
      }
    ],
    currentInningIdx: 0,
    result: 'In Progress'
  };
  
  // Add players
  const playerInputsA = document.querySelectorAll('#scorer-players-list-A input');
  const playerInputsB = document.querySelectorAll('#scorer-players-list-B input');
  
  playerInputsA.forEach(input => {
    if (input.value.trim()) {
      match.innings[0].batsmen.push({
        name: input.value.trim(),
        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0,
        dismissed: false,
        dismissal: ''
      });
    }
  });
  
  playerInputsB.forEach(input => {
    if (input.value.trim()) {
      match.innings[0].bowlers.push({
        name: input.value.trim(),
        overs: 0,
        maidens: 0,
        runs: 0,
        wickets: 0
      });
    }
  });
  
  if (match.innings[0].batsmen.length < 2) {
    alert('Please add at least 2 batsmen');
    return;
  }
  
  currentMatch = match;
  currentMatch.currentInning = match.innings[0]; // Fix: set currentInning reference
  scoreHistory = [];
  
  // Show active scorer
  document.getElementById('scorer-setup').style.display = 'none';
  document.getElementById('scorer-active').style.display = 'grid';
  
  // Update UI
  document.getElementById('score-live-team-label').textContent = `${teamA} Batting`;
  
  // Populate striker select
  const strikerSelect = document.getElementById('score-striker-select');
  strikerSelect.innerHTML = match.innings[0].batsmen.map(b => `<option value="${b.name}">${b.name}</option>`).join('');
  
  // Populate bowler select
  const bowlerSelect = document.getElementById('score-bowler-select');
  bowlerSelect.innerHTML = match.innings[0].bowlers.map(b => `<option value="${b.name}">${b.name}</option>`).join('');
  
  updateCreaseDetails();
  updateLiveScore();
  
  // Save match
  const matches = loadMatches();
  matches.push(match);
  saveMatches(matches);
}

function saveCurrentMatch() {
  const matches = loadMatches();
  const idx = matches.findIndex(m => m.id === currentMatch.id);
  if (idx !== -1) {
    matches[idx] = currentMatch;
  } else {
    matches.push(currentMatch);
  }
  saveMatches(matches);
}
function loadTournaments() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_TOURNAMENTS)) || [];
  } catch {
    return [];
  }
}

function saveTournaments(data) {
  localStorage.setItem(STORAGE_TOURNAMENTS, JSON.stringify(data));
}

function loadPlayers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_PLAYERS)) || [];
  } catch {
    return [];
  }
}

function savePlayers(data) {
  localStorage.setItem(STORAGE_PLAYERS, JSON.stringify(data));
}

function loadMatches() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_MATCHES)) || [];
  } catch {
    return [];
  }
}

function saveMatches(data) {
  localStorage.setItem(STORAGE_MATCHES, JSON.stringify(data));
}

function loadAllData() {
  loadTournaments();
  loadPlayers();
  loadMatches();
}

// ============ TAB NAVIGATION ============
function showTourneySubTab(tab, el) {
  document.querySelectorAll('.tsub-section').forEach(s => s.style.display = 'none');
  document.getElementById(`tsub-${tab}`).style.display = 'block';
  el.closest('.inner-tabs').querySelectorAll('.inner-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

function showScorecardSubTab(tab, el) {
  document.querySelectorAll('.ssub-section').forEach(s => s.style.display = 'none');
  document.getElementById(`ssub-${tab}`).style.display = 'block';
  el.closest('.inner-tabs').querySelectorAll('.inner-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

function showMatchCenterTab(tab, el) {
  // Only clear tabs within the same parent card
  const parentCard = el.closest('.glass-card');
  parentCard.querySelectorAll('.mc-tab-section').forEach(s => s.style.display = 'none');
  parentCard.querySelector(`#mc-${tab}`).style.display = 'block';
  el.closest('.inner-tabs').querySelectorAll('.inner-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

// ============ MODAL HELPERS ============
function openAddTeamModal() {
  openModal('modal-add-team');
}

function openScheduleMatchModal() {
  if (!currentTournament) {
    alert('Please select a tournament first');
    return;
  }
  
  const select = document.getElementById('schedule-teamA-select');
  select.innerHTML = currentTournament.teams.map(t => `<option value="${t.name}">${t.name}</option>`).join('');
  
  const selectB = document.getElementById('schedule-teamB-select');
  selectB.innerHTML = currentTournament.teams.map(t => `<option value="${t.name}">${t.name}</option>`).join('');
  
  openModal('modal-schedule-match');
}

function openAddPlayerModal() {
  openAddPlayerModalGlobal();
}

function loadTournamentMatchOptions() {
  // Placeholder
}

function loadScheduledMatchDetails() {
  // Placeholder
}

function toggleWktFielderField() {
  const dismissalType = document.getElementById('wkt-dismissal-type-select').value;
  const fielderDiv = document.getElementById('wkt-fielder-div');
  const fielderLabel = document.getElementById('wkt-fielder-label');
  
  if (['Caught', 'Run Out', 'Stumped'].includes(dismissalType)) {
    fielderDiv.style.display = 'block';
    fielderLabel.textContent = dismissalType === 'Caught' ? 'Caught By' : 'Run Out By';
  } else {
    fielderDiv.style.display = 'none';
  }
}

function renderProfileStatsFiltered() {
  // Placeholder for tournament filter
}

function renderMatchCenterCommentary() {
  // Placeholder for commentary rendering
}

// Initialize icons on load
window.addEventListener('load', () => {
  lucide.createIcons();
});