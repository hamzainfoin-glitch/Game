import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// DATA: 48 NATIONS & SQUADS (World Cup 2026)
// ============================================================
const NATIONS = [
  // Group A
  { id: 1, name: "Brazil", flag: "🇧🇷", group: "A", rating: 92, color: "#009c3b", kit: "#FFE600", region: "CONMEBOL" },
  { id: 2, name: "Argentina", flag: "🇦🇷", group: "A", rating: 93, color: "#74ACDF", kit: "#FFFFFF", region: "CONMEBOL" },
  { id: 3, name: "France", flag: "🇫🇷", group: "B", rating: 91, color: "#002395", kit: "#FFFFFF", region: "UEFA" },
  { id: 4, name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "B", rating: 89, color: "#003090", kit: "#FFFFFF", region: "UEFA" },
  { id: 5, name: "Spain", flag: "🇪🇸", group: "C", rating: 90, color: "#AA151B", kit: "#FFD700", region: "UEFA" },
  { id: 6, name: "Germany", flag: "🇩🇪", group: "C", rating: 88, color: "#000000", kit: "#FFFFFF", region: "UEFA" },
  { id: 7, name: "Portugal", flag: "🇵🇹", group: "D", rating: 89, color: "#006600", kit: "#FF0000", region: "UEFA" },
  { id: 8, name: "Netherlands", flag: "🇳🇱", group: "D", rating: 88, color: "#FF6600", kit: "#FFFFFF", region: "UEFA" },
  { id: 9, name: "Belgium", flag: "🇧🇪", group: "E", rating: 87, color: "#000000", kit: "#FF0000", region: "UEFA" },
  { id: 10, name: "Italy", flag: "🇮🇹", group: "E", rating: 87, color: "#003DA5", kit: "#FFFFFF", region: "UEFA" },
  { id: 11, name: "Croatia", flag: "🇭🇷", group: "F", rating: 86, color: "#FF0000", kit: "#FFFFFF", region: "UEFA" },
  { id: 12, name: "Denmark", flag: "🇩🇰", group: "F", rating: 85, color: "#C60C30", kit: "#FFFFFF", region: "UEFA" },
  { id: 13, name: "Mexico", flag: "🇲🇽", group: "G", rating: 84, color: "#006847", kit: "#FFFFFF", region: "CONCACAF" },
  { id: 14, name: "USA", flag: "🇺🇸", group: "G", rating: 83, color: "#002868", kit: "#FFFFFF", region: "CONCACAF" },
  { id: 15, name: "Canada", flag: "🇨🇦", group: "H", rating: 82, color: "#FF0000", kit: "#FFFFFF", region: "CONCACAF" },
  { id: 16, name: "Uruguay", flag: "🇺🇾", group: "H", rating: 84, color: "#7BBCD5", kit: "#FFFFFF", region: "CONMEBOL" },
  { id: 17, name: "Colombia", flag: "🇨🇴", group: "I", rating: 83, color: "#003087", kit: "#FFE000", region: "CONMEBOL" },
  { id: 18, name: "Ecuador", flag: "🇪🇨", group: "I", rating: 80, color: "#FFD700", kit: "#003087", region: "CONMEBOL" },
  { id: 19, name: "Morocco", flag: "🇲🇦", group: "J", rating: 84, color: "#C1272D", kit: "#006233", region: "CAF" },
  { id: 20, name: "Senegal", flag: "🇸🇳", group: "J", rating: 82, color: "#00853F", kit: "#FFFFFF", region: "CAF" },
  { id: 21, name: "Nigeria", flag: "🇳🇬", group: "K", rating: 81, color: "#008751", kit: "#FFFFFF", region: "CAF" },
  { id: 22, name: "Cameroon", flag: "🇨🇲", group: "K", rating: 80, color: "#007A5E", kit: "#CE1126", region: "CAF" },
  { id: 23, name: "Japan", flag: "🇯🇵", group: "L", rating: 83, color: "#003DA5", kit: "#FFFFFF", region: "AFC" },
  { id: 24, name: "South Korea", flag: "🇰🇷", group: "L", rating: 81, color: "#CD2E3A", kit: "#FFFFFF", region: "AFC" },
  { id: 25, name: "Australia", flag: "🇦🇺", group: "A", rating: 79, color: "#00843D", kit: "#FFD700", region: "AFC" },
  { id: 26, name: "Iran", flag: "🇮🇷", group: "B", rating: 78, color: "#239F40", kit: "#FFFFFF", region: "AFC" },
  { id: 27, name: "Saudi Arabia", flag: "🇸🇦", group: "C", rating: 78, color: "#006C35", kit: "#FFFFFF", region: "AFC" },
  { id: 28, name: "Qatar", flag: "🇶🇦", group: "D", rating: 76, color: "#8D1B3D", kit: "#FFFFFF", region: "AFC" },
  { id: 29, name: "Switzerland", flag: "🇨🇭", group: "E", rating: 85, color: "#FF0000", kit: "#FFFFFF", region: "UEFA" },
  { id: 30, name: "Poland", flag: "🇵🇱", group: "F", rating: 83, color: "#DC143C", kit: "#FFFFFF", region: "UEFA" },
  { id: 31, name: "Serbia", flag: "🇷🇸", group: "G", rating: 82, color: "#C6363C", kit: "#FFFFFF", region: "UEFA" },
  { id: 32, name: "Turkey", flag: "🇹🇷", group: "H", rating: 82, color: "#E30A17", kit: "#FFFFFF", region: "UEFA" },
  { id: 33, name: "Ukraine", flag: "🇺🇦", group: "I", rating: 81, color: "#005BBB", kit: "#FFD500", region: "UEFA" },
  { id: 34, name: "Austria", flag: "🇦🇹", group: "J", rating: 82, color: "#ED2939", kit: "#FFFFFF", region: "UEFA" },
  { id: 35, name: "Hungary", flag: "🇭🇺", group: "K", rating: 79, color: "#CE2939", kit: "#FFFFFF", region: "UEFA" },
  { id: 36, name: "Slovakia", flag: "🇸🇰", group: "L", rating: 78, color: "#0B4EA2", kit: "#FFFFFF", region: "UEFA" },
  { id: 37, name: "Chile", flag: "🇨🇱", group: "A", rating: 80, color: "#D52B1E", kit: "#FFFFFF", region: "CONMEBOL" },
  { id: 38, name: "Peru", flag: "🇵🇪", group: "B", rating: 79, color: "#D91023", kit: "#FFFFFF", region: "CONMEBOL" },
  { id: 39, name: "Venezuela", flag: "🇻🇪", group: "C", rating: 77, color: "#CF142B", kit: "#FFFFFF", region: "CONMEBOL" },
  { id: 40, name: "Panama", flag: "🇵🇦", group: "D", rating: 76, color: "#004A97", kit: "#FFFFFF", region: "CONCACAF" },
  { id: 41, name: "Costa Rica", flag: "🇨🇷", group: "E", rating: 76, color: "#002B7F", kit: "#FFFFFF", region: "CONCACAF" },
  { id: 42, name: "Honduras", flag: "🇭🇳", group: "F", rating: 74, color: "#003DA5", kit: "#FFFFFF", region: "CONCACAF" },
  { id: 43, name: "Jamaica", flag: "🇯🇲", group: "G", rating: 73, color: "#000000", kit: "#FFD700", region: "CONCACAF" },
  { id: 44, name: "Egypt", flag: "🇪🇬", group: "H", rating: 80, color: "#C8102E", kit: "#FFFFFF", region: "CAF" },
  { id: 45, name: "South Africa", flag: "🇿🇦", group: "I", rating: 75, color: "#007A4D", kit: "#FFB81C", region: "CAF" },
  { id: 46, name: "DR Congo", flag: "🇨🇩", group: "J", rating: 74, color: "#007FFF", kit: "#F7D200", region: "CAF" },
  { id: 47, name: "New Zealand", flag: "🇳🇿", group: "K", rating: 72, color: "#000000", kit: "#FFFFFF", region: "OFC" },
  { id: 48, name: "Indonesia", flag: "🇮🇩", group: "L", rating: 71, color: "#CE1126", kit: "#FFFFFF", region: "AFC" },
];

const PLAYERS_DB = [
  // Brazil
  { id: 1, name: "Vinicius Jr.", nation: "Brazil", pos: "LW", rating: 94, pace: 97, shoot: 88, pass: 82, drib: 93, def: 30, phys: 68, value: 5200, goals: 0, assists: 0, special: "Samba Dribbler" },
  { id: 2, name: "Rodrygo", nation: "Brazil", pos: "RW", rating: 88, pace: 91, shoot: 84, pass: 80, drib: 88, def: 28, phys: 62, value: 3400, goals: 0, assists: 0, special: "Quick Turn" },
  { id: 3, name: "Raphinha", nation: "Brazil", pos: "RW", rating: 86, pace: 88, shoot: 82, pass: 78, drib: 86, def: 30, phys: 65, value: 2800, goals: 0, assists: 0, special: "Elastico" },
  { id: 4, name: "Marquinhos", nation: "Brazil", pos: "CB", rating: 87, pace: 70, shoot: 40, pass: 72, drib: 60, def: 90, phys: 82, value: 2600, goals: 0, assists: 0, special: "Intercept King" },
  { id: 5, name: "Casemiro", nation: "Brazil", pos: "CDM", rating: 86, pace: 58, shoot: 70, pass: 74, drib: 70, def: 88, phys: 89, value: 2200, goals: 0, assists: 0, special: "Enforcer" },
  // Argentina
  { id: 6, name: "Lionel Messi", nation: "Argentina", pos: "RW", rating: 95, pace: 82, shoot: 95, pass: 96, drib: 98, def: 30, phys: 62, value: 6000, goals: 0, assists: 0, special: "World Champion" },
  { id: 7, name: "Julián Álvarez", nation: "Argentina", pos: "ST", rating: 87, pace: 85, shoot: 88, pass: 76, drib: 82, def: 40, phys: 72, value: 3600, goals: 0, assists: 0, special: "Press Machine" },
  { id: 8, name: "Enzo Fernández", nation: "Argentina", pos: "CM", rating: 86, pace: 72, shoot: 75, pass: 88, drib: 82, def: 76, phys: 75, value: 3200, goals: 0, assists: 0, special: "Box-to-Box" },
  { id: 9, name: "Emiliano Martínez", nation: "Argentina", pos: "GK", rating: 89, pace: 50, shoot: 20, pass: 60, drib: 30, def: 90, phys: 84, value: 2800, goals: 0, assists: 0, special: "Mind Games GK" },
  { id: 10, name: "Rodrigo De Paul", nation: "Argentina", pos: "CM", rating: 85, pace: 74, shoot: 74, pass: 85, drib: 80, def: 74, phys: 78, value: 2400, goals: 0, assists: 0, special: "Engine" },
  // France
  { id: 11, name: "Kylian Mbappé", nation: "France", pos: "ST", rating: 95, pace: 99, shoot: 92, pass: 82, drib: 93, def: 36, phys: 76, value: 7800, goals: 0, assists: 0, special: "Lightning Sprint" },
  { id: 12, name: "Antoine Griezmann", nation: "France", pos: "CAM", rating: 87, pace: 78, shoot: 88, pass: 82, drib: 84, def: 50, phys: 70, value: 2800, goals: 0, assists: 0, special: "False 9" },
  { id: 13, name: "Aurélien Tchouaméni", nation: "France", pos: "CDM", rating: 86, pace: 72, shoot: 68, pass: 78, drib: 74, def: 86, phys: 84, value: 2600, goals: 0, assists: 0, special: "Shield Wall" },
  { id: 14, name: "Raphaël Varane", nation: "France", pos: "CB", rating: 85, pace: 76, shoot: 38, pass: 68, drib: 55, def: 89, phys: 86, value: 1800, goals: 0, assists: 0, special: "Aerial Boss" },
  { id: 15, name: "Mike Maignan", nation: "France", pos: "GK", rating: 88, pace: 52, shoot: 18, pass: 62, drib: 28, def: 89, phys: 82, value: 2200, goals: 0, assists: 0, special: "Reflexes+" },
  // England
  { id: 16, name: "Harry Kane", nation: "England", pos: "ST", rating: 91, pace: 74, shoot: 94, pass: 84, drib: 80, def: 42, phys: 84, value: 4800, goals: 0, assists: 0, special: "Clinical Finisher" },
  { id: 17, name: "Jude Bellingham", nation: "England", pos: "CM", rating: 92, pace: 82, shoot: 84, pass: 88, drib: 88, def: 78, phys: 82, value: 5600, goals: 0, assists: 0, special: "Modern Maestro" },
  { id: 18, name: "Phil Foden", nation: "England", pos: "CAM", rating: 89, pace: 84, shoot: 84, pass: 86, drib: 88, def: 40, phys: 68, value: 4200, goals: 0, assists: 0, special: "Tight Control" },
  { id: 19, name: "Bukayo Saka", nation: "England", pos: "RW", rating: 88, pace: 86, shoot: 80, pass: 82, drib: 88, def: 60, phys: 68, value: 4000, goals: 0, assists: 0, special: "Versatile Wing" },
  { id: 20, name: "Declan Rice", nation: "England", pos: "CDM", rating: 87, pace: 70, shoot: 70, pass: 78, drib: 72, def: 88, phys: 84, value: 3600, goals: 0, assists: 0, special: "Destroyer" },
  // Spain
  { id: 21, name: "Pedri", nation: "Spain", pos: "CM", rating: 90, pace: 76, shoot: 76, pass: 90, drib: 90, def: 64, phys: 62, value: 4800, goals: 0, assists: 0, special: "Tiki-Taka King" },
  { id: 22, name: "Gavi", nation: "Spain", pos: "CM", rating: 88, pace: 78, shoot: 72, pass: 88, drib: 88, def: 68, phys: 64, value: 3800, goals: 0, assists: 0, special: "Gegenpressing" },
  { id: 23, name: "Lamine Yamal", nation: "Spain", pos: "RW", rating: 89, pace: 88, shoot: 82, pass: 84, drib: 92, def: 28, phys: 60, value: 5200, goals: 0, assists: 0, special: "Wonderkid" },
  { id: 24, name: "Álvaro Morata", nation: "Spain", pos: "ST", rating: 84, pace: 80, shoot: 84, pass: 72, drib: 76, def: 44, phys: 78, value: 1800, goals: 0, assists: 0, special: "Movement+" },
  { id: 25, name: "Rodri", nation: "Spain", pos: "CDM", rating: 92, pace: 64, shoot: 68, pass: 86, drib: 78, def: 92, phys: 84, value: 4600, goals: 0, assists: 0, special: "TOTY CM" },
  // Germany
  { id: 26, name: "Florian Wirtz", nation: "Germany", pos: "CAM", rating: 90, pace: 82, shoot: 84, pass: 88, drib: 90, def: 40, phys: 66, value: 4600, goals: 0, assists: 0, special: "Creative Genius" },
  { id: 27, name: "Jamal Musiala", nation: "Germany", pos: "CAM", rating: 89, pace: 84, shoot: 82, pass: 84, drib: 90, def: 38, phys: 64, value: 4400, goals: 0, assists: 0, special: "Quick Feet" },
  { id: 28, name: "Kai Havertz", nation: "Germany", pos: "ST", rating: 86, pace: 80, shoot: 84, pass: 78, drib: 82, def: 42, phys: 74, value: 2800, goals: 0, assists: 0, special: "Poacher" },
  { id: 29, name: "Joshua Kimmich", nation: "Germany", pos: "CM", rating: 88, pace: 70, shoot: 72, pass: 90, drib: 78, def: 82, phys: 74, value: 3200, goals: 0, assists: 0, special: "Field General" },
  { id: 30, name: "Toni Kroos", nation: "Germany", pos: "CM", rating: 87, pace: 56, shoot: 72, pass: 94, drib: 78, def: 68, phys: 70, value: 2600, goals: 0, assists: 0, special: "Pass Master" },
  // Portugal
  { id: 31, name: "Cristiano Ronaldo", nation: "Portugal", pos: "ST", rating: 91, pace: 84, shoot: 96, pass: 76, drib: 87, def: 32, phys: 84, value: 3200, goals: 0, assists: 0, special: "SIUUU" },
  { id: 32, name: "Bruno Fernandes", nation: "Portugal", pos: "CAM", rating: 88, pace: 74, shoot: 82, pass: 90, drib: 84, def: 52, phys: 72, value: 3400, goals: 0, assists: 0, special: "Long Shot" },
  { id: 33, name: "Bernardo Silva", nation: "Portugal", pos: "CM", rating: 88, pace: 78, shoot: 78, pass: 88, drib: 88, def: 58, phys: 68, value: 3200, goals: 0, assists: 0, special: "Technician" },
  { id: 34, name: "Rafael Leão", nation: "Portugal", pos: "LW", rating: 88, pace: 94, shoot: 82, pass: 78, drib: 88, def: 28, phys: 70, value: 3600, goals: 0, assists: 0, special: "Speed Demon" },
  { id: 35, name: "Rúben Dias", nation: "Portugal", pos: "CB", rating: 88, pace: 72, shoot: 40, pass: 70, drib: 58, def: 90, phys: 86, value: 3000, goals: 0, assists: 0, special: "Stone Wall" },
  // Netherlands
  { id: 36, name: "Virgil van Dijk", nation: "Netherlands", pos: "CB", rating: 90, pace: 78, shoot: 58, pass: 74, drib: 62, def: 92, phys: 92, value: 3200, goals: 0, assists: 0, special: "Colossus" },
  { id: 37, name: "Frenkie de Jong", nation: "Netherlands", pos: "CM", rating: 87, pace: 76, shoot: 68, pass: 88, drib: 86, def: 70, phys: 72, value: 3000, goals: 0, assists: 0, special: "Ball Carrier" },
  { id: 38, name: "Cody Gakpo", nation: "Netherlands", pos: "LW", rating: 85, pace: 86, shoot: 82, pass: 78, drib: 82, def: 36, phys: 72, value: 2600, goals: 0, assists: 0, special: "Powerful Winger" },
  { id: 39, name: "Memphis Depay", nation: "Netherlands", pos: "ST", rating: 85, pace: 86, shoot: 86, pass: 78, drib: 84, def: 30, phys: 70, value: 2200, goals: 0, assists: 0, special: "Tattoo King" },
  { id: 40, name: "Xavi Simons", nation: "Netherlands", pos: "CAM", rating: 86, pace: 82, shoot: 80, pass: 84, drib: 88, def: 38, phys: 62, value: 3000, goals: 0, assists: 0, special: "Young Talent" },
  // Morocco
  { id: 41, name: "Achraf Hakimi", nation: "Morocco", pos: "RB", rating: 88, pace: 94, shoot: 74, pass: 78, drib: 84, def: 76, phys: 72, value: 3800, goals: 0, assists: 0, special: "Overlapping Fullback" },
  { id: 42, name: "Hakim Ziyech", nation: "Morocco", pos: "RW", rating: 84, pace: 78, shoot: 82, pass: 84, drib: 86, def: 30, phys: 62, value: 2200, goals: 0, assists: 0, special: "Left Foot Magic" },
  { id: 43, name: "Yassine Bounou", nation: "Morocco", pos: "GK", rating: 87, pace: 50, shoot: 18, pass: 60, drib: 28, def: 87, phys: 78, value: 2400, goals: 0, assists: 0, special: "Penalty Expert" },
  // Japan
  { id: 44, name: "Takumi Minamino", nation: "Japan", pos: "CAM", rating: 83, pace: 84, shoot: 80, pass: 78, drib: 80, def: 48, phys: 68, value: 1800, goals: 0, assists: 0, special: "Engine" },
  { id: 45, name: "Kaoru Mitoma", nation: "Japan", pos: "LW", rating: 84, pace: 90, shoot: 78, pass: 76, drib: 86, def: 34, phys: 64, value: 2200, goals: 0, assists: 0, special: "Dribble Artist" },
  // USA
  { id: 46, name: "Christian Pulisic", nation: "USA", pos: "CAM", rating: 85, pace: 84, shoot: 80, pass: 80, drib: 84, def: 40, phys: 66, value: 2800, goals: 0, assists: 0, special: "Captain America" },
  { id: 47, name: "Gio Reyna", nation: "USA", pos: "CAM", rating: 83, pace: 80, shoot: 76, pass: 82, drib: 84, def: 36, phys: 62, value: 2200, goals: 0, assists: 0, special: "Next Gen" },
  // Mexico
  { id: 48, name: "Hirving Lozano", nation: "Mexico", pos: "RW", rating: 84, pace: 92, shoot: 78, pass: 74, drib: 84, def: 32, phys: 66, value: 2200, goals: 0, assists: 0, special: "El Chucky" },
  { id: 49, name: "Edson Álvarez", nation: "Mexico", pos: "CDM", rating: 84, pace: 70, shoot: 64, pass: 76, drib: 70, def: 86, phys: 84, value: 2400, goals: 0, assists: 0, special: "Bulldozer" },
  // South Korea
  { id: 50, name: "Son Heung-min", nation: "South Korea", pos: "LW", rating: 89, pace: 90, shoot: 88, pass: 82, drib: 86, def: 38, phys: 72, value: 4200, goals: 0, assists: 0, special: "Captain Son" },
];

// Generate additional players for remaining nations
const generatePlayers = () => {
  const extra = [];
  const nations_needing_players = NATIONS.map(n => n.name).filter(
    name => !PLAYERS_DB.some(p => p.nation === name)
  );
  
  const firstNames = ["Carlos","Pedro","Diego","Andrés","Lucas","Marco","Ivan","Niko","Ali","Omar","Ahmed","Yusuf","Kenji","Hiroshi","Park","Kim","Lee","Sven","Lars","Emil"];
  const lastNames = ["Silva","García","Santos","González","Müller","Fischer","Petrov","Novak","Hassan","Okafor","Tanaka","Suzuki","Nakamura","Hoffman","Andersen","Nielsen"];
  const positions = ["ST","CM","CB","LW","RW","CDM","GK","CAM","LB","RB"];
  
  nations_needing_players.forEach((nation, ni) => {
    const rating = 70 + Math.floor(Math.random() * 15);
    for (let i = 0; i < 3; i++) {
      extra.push({
        id: 1000 + ni * 3 + i,
        name: `${firstNames[(ni + i) % firstNames.length]} ${lastNames[(ni + i) % lastNames.length]}`,
        nation,
        pos: positions[(ni + i) % positions.length],
        rating: rating - i * 2,
        pace: 60 + Math.floor(Math.random() * 30),
        shoot: 60 + Math.floor(Math.random() * 30),
        pass: 60 + Math.floor(Math.random() * 30),
        drib: 60 + Math.floor(Math.random() * 30),
        def: 60 + Math.floor(Math.random() * 30),
        phys: 60 + Math.floor(Math.random() * 30),
        value: 500 + Math.floor(Math.random() * 1500),
        goals: 0, assists: 0,
        special: "Team Player"
      });
    }
  });
  return extra;
};

const ALL_PLAYERS = [...PLAYERS_DB, ...generatePlayers()];

// RPG SKILLS/PERKS
const RPG_SKILLS = [
  { id: "sprint_boost", name: "Speed Surge", desc: "+5 pace for 30s", icon: "⚡", cost: 2, type: "active" },
  { id: "perfect_pass", name: "Laser Vision", desc: "Perfect pass accuracy", icon: "🎯", cost: 3, type: "active" },
  { id: "iron_tackle", name: "Iron Tackle", desc: "Next tackle always wins", icon: "🛡️", cost: 2, type: "active" },
  { id: "wonder_goal", name: "Wonder Shot", desc: "Unstoppable next shot", icon: "🔥", cost: 5, type: "active" },
  { id: "stamina_up", name: "Iron Lungs", desc: "+20% stamina bar", icon: "💨", cost: 10, type: "passive" },
  { id: "pace_up", name: "Sonic Legs", desc: "+3 base pace", icon: "👟", cost: 8, type: "passive" },
  { id: "shoot_up", name: "Dead Eye", desc: "+4 shooting", icon: "🎯", cost: 8, type: "passive" },
  { id: "clutch", name: "Clutch Gene", desc: "+10 all stats in 80th+ min", icon: "⭐", cost: 15, type: "passive" },
];

// ============================================================
// GAME STATE HOOK
// ============================================================
const useGameState = () => {
  const [screen, setScreen] = useState("splash");
  const [playerData, setPlayerData] = useState({
    name: "Player",
    level: 1, xp: 0, xpNeeded: 100,
    coins: 5000, gems: 50,
    trophies: 0, wins: 0, losses: 0, draws: 0,
    selectedNation: null,
    unlockedSkills: [],
    skillPoints: 3,
    rpgStats: { finishing: 10, tackling: 10, passing: 10, speed: 10, stamina: 100 },
    myTeam: [],
    myTeamCoins: 10000,
    pack_openings: 0,
    tournament: null,
    tournament_results: [],
  });

  const updatePlayer = (updates) => setPlayerData(prev => ({ ...prev, ...updates }));
  const gainXP = (amount) => {
    setPlayerData(prev => {
      let newXP = prev.xp + amount;
      let newLevel = prev.level;
      let newXPNeeded = prev.xpNeeded;
      let newSP = prev.skillPoints;
      while (newXP >= newXPNeeded) {
        newXP -= newXPNeeded;
        newLevel++;
        newXPNeeded = Math.floor(newXPNeeded * 1.4);
        newSP++;
      }
      return { ...prev, xp: newXP, level: newLevel, xpNeeded: newXPNeeded, skillPoints: newSP };
    });
  };

  return { screen, setScreen, playerData, updatePlayer, gainXP };
};

// ============================================================
// MATCH ENGINE
// ============================================================
const simulateMatch = (teamRating, opponentRating, skills = []) => {
  const ratingDiff = teamRating - opponentRating;
  const homeBonus = 0.1;
  const winChance = 0.45 + homeBonus + ratingDiff * 0.005;
  
  const rand = Math.random();
  let result, myGoals, oppGoals;
  
  if (rand < winChance) {
    myGoals = 1 + Math.floor(Math.random() * 4);
    oppGoals = Math.max(0, myGoals - 1 - Math.floor(Math.random() * 2));
    result = "win";
  } else if (rand < winChance + 0.2) {
    myGoals = Math.floor(Math.random() * 3);
    oppGoals = myGoals;
    result = "draw";
  } else {
    oppGoals = 1 + Math.floor(Math.random() * 3);
    myGoals = Math.max(0, oppGoals - 1 - Math.floor(Math.random() * 2));
    result = "loss";
  }
  
  const scorers = [];
  const minutes = [];
  for (let i = 0; i < myGoals; i++) {
    minutes.push(1 + Math.floor(Math.random() * 90));
  }
  minutes.sort((a, b) => a - b);
  
  return { result, myGoals, oppGoals, minutes };
};

// ============================================================
// COMPONENTS
// ============================================================

// --- SPLASH SCREEN ---
const SplashScreen = ({ onStart }) => {
  const [animDone, setAnimDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimDone(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0d1a3a 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      fontFamily: "'Rajdhani', sans-serif", overflow: "hidden", position: "relative"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&family=Orbitron:wght@400;700;900&display=swap');
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.8;transform:scale(1.03)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes floatUp { 0%{transform:translateY(30px);opacity:0} 100%{transform:translateY(0);opacity:1} }
        @keyframes spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        @keyframes stadium { 0%{opacity:0.2} 50%{opacity:0.4} 100%{opacity:0.2} }
        @keyframes glowPulse { 0%,100%{box-shadow:0 0 20px #00d4ff44} 50%{box-shadow:0 0 60px #00d4ffaa,0 0 100px #7b2fff44} }
      `}</style>

      {/* Background stadium pattern */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.07,
        backgroundImage: "repeating-linear-gradient(0deg, #00ff88 0px, #00ff88 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #00ff88 0px, #00ff88 1px, transparent 1px, transparent 40px)"
      }} />
      
      {/* Glowing orbs */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: `${80 + i * 30}px`, height: `${80 + i * 30}px`,
          borderRadius: "50%",
          background: i % 2 === 0 ? "radial-gradient(circle, #00d4ff22, transparent)" : "radial-gradient(circle, #7b2fff22, transparent)",
          top: `${10 + i * 15}%`, left: `${10 + i * 14}%`,
          animation: `pulse ${2 + i * 0.5}s ease-in-out infinite`,
        }} />
      ))}

      <div style={{ textAlign: "center", animation: "floatUp 1s ease forwards", position: "relative", zIndex: 10 }}>
        {/* Trophy */}
        <div style={{ fontSize: "80px", marginBottom: "16px", animation: "pulse 2s ease-in-out infinite" }}>🏆</div>
        
        <div style={{
          fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(28px, 8vw, 48px)", fontWeight: 900,
          background: "linear-gradient(90deg, #FFD700, #FF6B00, #FFD700)",
          backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          animation: "shimmer 3s linear infinite",
          letterSpacing: "2px", lineHeight: 1.1
        }}>
          WORLD CUP
        </div>
        <div style={{
          fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(40px, 11vw, 72px)", fontWeight: 900,
          background: "linear-gradient(90deg, #00d4ff, #7b2fff, #00d4ff)",
          backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          animation: "shimmer 2s linear infinite", letterSpacing: "3px"
        }}>
          2026
        </div>
        
        <div style={{ color: "#aaa", fontSize: "14px", letterSpacing: "6px", marginTop: "4px", textTransform: "uppercase" }}>
          USA · Canada · Mexico
        </div>

        <div style={{
          marginTop: "24px", color: "#64748b", fontSize: "12px", letterSpacing: "4px"
        }}>
          {animDone ? "⚽ MOBILE FOOTBALL EXPERIENCE ⚽" : "Loading..."}
        </div>

        {animDone && (
          <button onClick={onStart} style={{
            marginTop: "32px", padding: "16px 48px",
            background: "linear-gradient(135deg, #FFD700, #FF6B00)",
            border: "none", borderRadius: "50px", cursor: "pointer",
            fontFamily: "'Orbitron', sans-serif", fontSize: "16px", fontWeight: 700,
            color: "#000", letterSpacing: "2px",
            animation: "glowPulse 2s ease-in-out infinite",
            transition: "transform 0.1s"
          }}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.96)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          >
            KICK OFF
          </button>
        )}
      </div>
      
      <div style={{ position: "absolute", bottom: "20px", color: "#333", fontSize: "11px", letterSpacing: "2px" }}>
        48 NATIONS • 500+ PLAYERS • MYTEAM MODE
      </div>
    </div>
  );
};

// --- NATION SELECT ---
const NationSelect = ({ onSelect, playerData }) => {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("ALL");
  const regions = ["ALL", "UEFA", "CONMEBOL", "CONCACAF", "CAF", "AFC", "OFC"];
  
  const filtered = NATIONS.filter(n =>
    (selectedRegion === "ALL" || n.region === selectedRegion) &&
    (n.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{
      minHeight: "100vh", background: "#050510", fontFamily: "'Rajdhani', sans-serif",
      color: "#fff", display: "flex", flexDirection: "column"
    }}>
      <div style={{
        background: "linear-gradient(135deg, #1a0a2e, #0d1a3a)",
        padding: "20px 16px 16px", borderBottom: "1px solid #1e3a5f"
      }}>
        <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "18px", color: "#00d4ff", margin: "0 0 12px" }}>
          🌍 SELECT YOUR NATION
        </h2>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search nation..."
          style={{
            width: "100%", padding: "10px 14px", background: "#0d1a3a",
            border: "1px solid #1e3a5f", borderRadius: "8px", color: "#fff",
            fontSize: "14px", boxSizing: "border-box", outline: "none"
          }}
        />
        <div style={{ display: "flex", gap: "6px", marginTop: "10px", overflowX: "auto", paddingBottom: "4px" }}>
          {regions.map(r => (
            <button key={r} onClick={() => setSelectedRegion(r)} style={{
              padding: "4px 10px", borderRadius: "20px", border: "1px solid",
              borderColor: selectedRegion === r ? "#00d4ff" : "#1e3a5f",
              background: selectedRegion === r ? "#00d4ff22" : "transparent",
              color: selectedRegion === r ? "#00d4ff" : "#888",
              fontSize: "11px", cursor: "pointer", whiteSpace: "nowrap",
              fontFamily: "'Rajdhani', sans-serif", fontWeight: 600
            }}>{r}</button>
          ))}
        </div>
      </div>

      <div style={{
        flex: 1, overflowY: "auto", padding: "12px",
        display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px"
      }}>
        {filtered.map(nation => (
          <button key={nation.id} onClick={() => onSelect(nation)} style={{
            background: "linear-gradient(135deg, #0d1a3a, #1a0a2e)",
            border: "1px solid #1e3a5f", borderRadius: "12px", padding: "14px 10px",
            cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center",
            gap: "6px", transition: "all 0.2s", color: "#fff",
            fontFamily: "'Rajdhani', sans-serif"
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#00d4ff"; e.currentTarget.style.background = "linear-gradient(135deg, #1a2a4a, #2a1a3e)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e3a5f"; e.currentTarget.style.background = "linear-gradient(135deg, #0d1a3a, #1a0a2e)"; }}
          >
            <span style={{ fontSize: "36px" }}>{nation.flag}</span>
            <span style={{ fontWeight: 700, fontSize: "13px", textAlign: "center" }}>{nation.name}</span>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span style={{
                background: ratingColor(nation.rating), borderRadius: "4px",
                padding: "2px 6px", fontSize: "11px", fontWeight: 700, color: "#000"
              }}>{nation.rating}</span>
              <span style={{ fontSize: "10px", color: "#64748b" }}>Grp {nation.group}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const ratingColor = (r) => {
  if (r >= 90) return "#FFD700";
  if (r >= 85) return "#00d4ff";
  if (r >= 80) return "#00ff88";
  if (r >= 75) return "#ff9500";
  return "#ff4444";
};

// --- MAIN MENU ---
const MainMenu = ({ playerData, setScreen }) => {
  const menuItems = [
    { id: "tournament", icon: "🏆", label: "World Cup", sub: "48 nations bracket", color: "#FFD700" },
    { id: "quickmatch", icon: "⚽", label: "Quick Match", sub: "Kick off now", color: "#00ff88" },
    { id: "myteam", icon: "👥", label: "My Team", sub: "Online • Ultimate", color: "#00d4ff" },
    { id: "rpg", icon: "⚔️", label: "Career RPG", sub: "Level up your player", color: "#7b2fff" },
    { id: "nations", icon: "🌍", label: "Nations", sub: "Browse all 48", color: "#ff6b35" },
    { id: "players", icon: "⭐", label: "Players", sub: "500+ world class", color: "#ff2d78" },
  ];

  const nation = NATIONS.find(n => n.name === playerData.selectedNation?.name);

  return (
    <div style={{
      minHeight: "100vh", background: "#050510", fontFamily: "'Rajdhani', sans-serif",
      color: "#fff", display: "flex", flexDirection: "column"
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1a0a2e 0%, #0d1a3a 100%)",
        padding: "16px", borderBottom: "1px solid #1e3a5f"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "11px", color: "#64748b", letterSpacing: "2px" }}>WORLD CUP 2026</div>
            <div style={{ fontSize: "20px", fontWeight: 700 }}>{playerData.name}</div>
          </div>
          {nation && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "32px" }}>{nation.flag}</span>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "12px", color: "#aaa" }}>{nation.name}</div>
                <div style={{ fontSize: "11px", color: "#64748b" }}>OVR {nation.rating}</div>
              </div>
            </div>
          )}
        </div>

        {/* XP Bar */}
        <div style={{ marginTop: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#64748b", marginBottom: "4px" }}>
            <span>LVL {playerData.level}</span>
            <span>{playerData.xp}/{playerData.xpNeeded} XP</span>
          </div>
          <div style={{ height: "6px", background: "#1e3a5f", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: "3px",
              background: "linear-gradient(90deg, #7b2fff, #00d4ff)",
              width: `${(playerData.xp / playerData.xpNeeded) * 100}%`,
              transition: "width 0.5s ease"
            }} />
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: "16px", marginTop: "12px" }}>
          {[
            { label: "💰", val: playerData.coins.toLocaleString() },
            { label: "💎", val: playerData.gems },
            { label: "🏆", val: playerData.trophies },
            { label: "✅", val: `${playerData.wins}W-${playerData.draws}D-${playerData.losses}L` },
          ].map((s, i) => (
            <div key={i} style={{ fontSize: "12px", color: "#aaa" }}>
              <span>{s.label} {s.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div style={{
        flex: 1, padding: "16px",
        display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px"
      }}>
        {menuItems.map(item => (
          <button key={item.id} onClick={() => setScreen(item.id)} style={{
            background: "linear-gradient(135deg, #0d1a3a, #1a0a2e)",
            border: `1px solid ${item.color}33`,
            borderRadius: "14px", padding: "20px 14px",
            cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start",
            gap: "6px", transition: "all 0.2s", textAlign: "left"
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = item.color; e.currentTarget.style.background = `linear-gradient(135deg, #1a2a4a, #2a1a3e)`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = `${item.color}33`; e.currentTarget.style.background = "linear-gradient(135deg, #0d1a3a, #1a0a2e)"; }}
          >
            <span style={{ fontSize: "32px" }}>{item.icon}</span>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "13px", fontWeight: 700, color: item.color }}>{item.label}</span>
            <span style={{ fontSize: "11px", color: "#64748b" }}>{item.sub}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// --- MATCH SCREEN ---
const MatchScreen = ({ playerData, opponent, onResult, onBack }) => {
  const [phase, setPhase] = useState("pregame"); // pregame, playing, halftime, result
  const [minute, setMinute] = useState(0);
  const [myScore, setMyScore] = useState(0);
  const [oppScore, setOppScore] = useState(0);
  const [events, setEvents] = useState([]);
  const [activeSkill, setActiveSkill] = useState(null);
  const [stamina, setStamina] = useState(100);
  const intervalRef = useRef(null);
  const myNation = NATIONS.find(n => n.name === playerData.selectedNation?.name);
  const myRating = myNation?.rating || 80;
  const oppRating = opponent?.rating || 80;

  const addEvent = useCallback((ev) => {
    setEvents(prev => [ev, ...prev].slice(0, 8));
  }, []);

  const startMatch = () => {
    setPhase("playing");
    setMinute(0);
    setMyScore(0);
    setOppScore(0);
    setEvents([]);
  };

  useEffect(() => {
    if (phase !== "playing") return;
    
    intervalRef.current = setInterval(() => {
      setMinute(prev => {
        const newMin = prev + 1;
        
        // Random events
        const rand = Math.random();
        const myChance = 0.06 + (myRating - oppRating) * 0.001;
        const oppChance = 0.05 + (oppRating - myRating) * 0.001;
        
        if (rand < myChance) {
          const scorer = ALL_PLAYERS.filter(p => p.nation === myNation?.name)[Math.floor(Math.random() * 3)] || { name: "Team" };
          setMyScore(s => s + 1);
          addEvent({ type: "goal", team: "my", player: scorer.name, min: newMin, icon: "⚽" });
        } else if (rand < myChance + oppChance) {
          setOppScore(s => s + 1);
          addEvent({ type: "goal", team: "opp", player: opponent?.name + " player", min: newMin, icon: "⚽" });
        } else if (rand < myChance + oppChance + 0.04) {
          addEvent({ type: "card", team: Math.random() > 0.5 ? "my" : "opp", player: "Player", min: newMin, icon: Math.random() > 0.7 ? "🟥" : "🟨" });
        } else if (rand < myChance + oppChance + 0.07) {
          addEvent({ type: "chance", team: "my", min: newMin, icon: "😤", text: "Close chance!" });
        }
        
        setStamina(s => Math.max(20, s - 0.5));
        
        if (newMin === 45) {
          clearInterval(intervalRef.current);
          setPhase("halftime");
        }
        if (newMin >= 90) {
          clearInterval(intervalRef.current);
          setPhase("result");
        }
        return newMin;
      });
    }, 100);
    
    return () => clearInterval(intervalRef.current);
  }, [phase, myRating, oppRating, myNation, opponent, addEvent]);

  const continueFromHalftime = () => {
    setPhase("playing");
  };

  const useSkill = (skill) => {
    setActiveSkill(skill);
    setTimeout(() => setActiveSkill(null), 3000);
    if (skill.id === "wonder_goal") {
      setMyScore(s => s + 1);
      addEvent({ type: "goal", team: "my", player: "Special Goal", min: minute, icon: "🔥" });
    }
  };

  if (phase === "pregame") {
    return (
      <div style={{
        minHeight: "100vh", background: "#050510", fontFamily: "'Rajdhani', sans-serif",
        color: "#fff", display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "20px"
      }}>
        <button onClick={onBack} style={{ position: "absolute", top: "16px", left: "16px", background: "none", border: "1px solid #1e3a5f", borderRadius: "8px", color: "#aaa", padding: "6px 12px", cursor: "pointer", fontFamily: "'Rajdhani', sans-serif" }}>← Back</button>
        
        <div style={{ fontSize: "12px", letterSpacing: "4px", color: "#64748b", marginBottom: "24px" }}>KICKOFF</div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "32px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "56px" }}>{myNation?.flag || "🏳️"}</div>
            <div style={{ fontWeight: 700, marginTop: "8px" }}>{myNation?.name || "Your Team"}</div>
            <div style={{ color: "#FFD700", fontSize: "13px" }}>OVR {myRating}</div>
          </div>
          <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "24px", color: "#00d4ff" }}>VS</div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "56px" }}>{opponent?.flag || "⚽"}</div>
            <div style={{ fontWeight: 700, marginTop: "8px" }}>{opponent?.name || "CPU"}</div>
            <div style={{ color: "#ff9500", fontSize: "13px" }}>OVR {oppRating}</div>
          </div>
        </div>

        <div style={{ background: "#0d1a3a", borderRadius: "12px", padding: "16px", width: "100%", maxWidth: "320px", marginBottom: "24px" }}>
          <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "8px" }}>WIN PROBABILITY</div>
          <div style={{ height: "8px", background: "#1e3a5f", borderRadius: "4px", overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: "4px",
              background: "linear-gradient(90deg, #00ff88, #00d4ff)",
              width: `${Math.min(85, Math.max(15, 50 + (myRating - oppRating) * 1.5))}%`
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginTop: "4px" }}>
            <span style={{ color: "#00ff88" }}>{Math.min(85, Math.max(15, 50 + (myRating - oppRating) * 1.5)).toFixed(0)}%</span>
            <span style={{ color: "#ff4444" }}>{Math.max(15, Math.min(85, 50 - (myRating - oppRating) * 1.5)).toFixed(0)}%</span>
          </div>
        </div>
        
        <button onClick={startMatch} style={{
          padding: "16px 48px", background: "linear-gradient(135deg, #FFD700, #FF6B00)",
          border: "none", borderRadius: "50px", cursor: "pointer",
          fontFamily: "'Orbitron', sans-serif", fontSize: "16px", fontWeight: 700, color: "#000"
        }}>
          ▶ KICK OFF
        </button>
      </div>
    );
  }

  if (phase === "result") {
    const result = myScore > oppScore ? "WIN" : myScore < oppScore ? "LOSS" : "DRAW";
    const xpGained = result === "WIN" ? 60 : result === "DRAW" ? 20 : 10;
    const coinsGained = result === "WIN" ? 300 : 50;
    
    return (
      <div style={{
        minHeight: "100vh", background: "#050510", fontFamily: "'Rajdhani', sans-serif",
        color: "#fff", display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "20px"
      }}>
        <div style={{
          fontSize: "clamp(36px, 12vw, 64px)", fontFamily: "'Orbitron', sans-serif", fontWeight: 900,
          color: result === "WIN" ? "#FFD700" : result === "LOSS" ? "#ff4444" : "#00d4ff",
          marginBottom: "16px"
        }}>{result}</div>
        
        <div style={{ fontSize: "clamp(32px, 10vw, 56px)", fontWeight: 700, marginBottom: "24px" }}>
          {myScore} - {oppScore}
        </div>
        
        <div style={{
          display: "flex", gap: "16px", marginBottom: "32px",
          background: "#0d1a3a", padding: "16px 24px", borderRadius: "12px"
        }}>
          <span style={{ color: "#7b2fff" }}>+{xpGained} XP</span>
          <span style={{ color: "#FFD700" }}>+{coinsGained} 💰</span>
        </div>
        
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={() => onResult({ result: result.toLowerCase(), myScore, oppScore, xpGained, coinsGained })} style={{
            padding: "14px 28px", background: "linear-gradient(135deg, #FFD700, #FF6B00)",
            border: "none", borderRadius: "50px", cursor: "pointer",
            fontFamily: "'Orbitron', sans-serif", fontSize: "13px", fontWeight: 700, color: "#000"
          }}>
            CONTINUE
          </button>
          <button onClick={onBack} style={{
            padding: "14px 28px", background: "transparent",
            border: "1px solid #1e3a5f", borderRadius: "50px", cursor: "pointer",
            fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", color: "#aaa"
          }}>
            MENU
          </button>
        </div>
      </div>
    );
  }

  if (phase === "halftime") {
    return (
      <div style={{
        minHeight: "100vh", background: "#050510", fontFamily: "'Rajdhani', sans-serif",
        color: "#fff", display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "20px"
      }}>
        <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "20px", color: "#00d4ff", marginBottom: "16px" }}>HALF TIME</div>
        <div style={{ fontSize: "48px", fontWeight: 700, marginBottom: "32px" }}>{myScore} - {oppScore}</div>
        
        {/* Skills selection */}
        <div style={{ width: "100%", maxWidth: "360px" }}>
          <div style={{ fontSize: "12px", color: "#64748b", letterSpacing: "2px", marginBottom: "10px" }}>ACTIVE SKILLS</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px", marginBottom: "24px" }}>
            {RPG_SKILLS.filter(s => s.type === "active").map(skill => (
              <button key={skill.id} onClick={() => useSkill(skill)} style={{
                background: "#0d1a3a", border: "1px solid #1e3a5f",
                borderRadius: "10px", padding: "10px", cursor: "pointer",
                color: "#fff", fontFamily: "'Rajdhani', sans-serif", textAlign: "center"
              }}>
                <div style={{ fontSize: "24px" }}>{skill.icon}</div>
                <div style={{ fontSize: "11px", fontWeight: 700 }}>{skill.name}</div>
              </button>
            ))}
          </div>
        </div>
        
        <button onClick={continueFromHalftime} style={{
          padding: "16px 48px", background: "linear-gradient(135deg, #FFD700, #FF6B00)",
          border: "none", borderRadius: "50px", cursor: "pointer",
          fontFamily: "'Orbitron', sans-serif", fontSize: "14px", fontWeight: 700, color: "#000"
        }}>
          2ND HALF ▶
        </button>
      </div>
    );
  }

  // PLAYING PHASE
  return (
    <div style={{
      minHeight: "100vh", background: "#050510", fontFamily: "'Rajdhani', sans-serif",
      color: "#fff", display: "flex", flexDirection: "column"
    }}>
      {/* Scoreboard */}
      <div style={{
        background: "linear-gradient(135deg, #1a0a2e, #0d1a3a)",
        padding: "12px 16px", borderBottom: "1px solid #1e3a5f",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "24px" }}>{myNation?.flag}</span>
          <span style={{ fontWeight: 700 }}>{myNation?.name || "You"}</span>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "28px", fontWeight: 900 }}>
            <span style={{ color: "#00ff88" }}>{myScore}</span>
            <span style={{ color: "#666", margin: "0 8px" }}>-</span>
            <span style={{ color: "#ff4444" }}>{oppScore}</span>
          </div>
          <div style={{ fontSize: "12px", color: "#00d4ff" }}>{minute}'</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontWeight: 700 }}>{opponent?.name}</span>
          <span style={{ fontSize: "24px" }}>{opponent?.flag}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: "4px", background: "#1e3a5f" }}>
        <div style={{
          height: "100%", background: "linear-gradient(90deg, #00d4ff, #7b2fff)",
          width: `${(minute / 90) * 100}%`, transition: "width 0.1s"
        }} />
      </div>

      {/* Pitch visualization */}
      <div style={{
        margin: "12px",
        background: "linear-gradient(180deg, #1a3a1a 0%, #0d2d0d 50%, #1a3a1a 100%)",
        borderRadius: "12px", padding: "16px", border: "1px solid #2d5a2d",
        minHeight: "200px", position: "relative", overflow: "hidden"
      }}>
        {/* Field lines */}
        <div style={{ position: "absolute", inset: "0", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", opacity: 0.2 }}>
          <div style={{ width: "80%", height: "60%", border: "1px solid #fff", borderRadius: "2px", position: "relative" }}>
            <div style={{ position: "absolute", top: "50%", left: "-10%", right: "-10%", height: "1px", background: "#fff" }} />
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "60px", height: "60px", border: "1px solid #fff", borderRadius: "50%" }} />
          </div>
        </div>
        
        {/* Active skill indicator */}
        {activeSkill && (
          <div style={{
            position: "absolute", top: "8px", left: "50%", transform: "translateX(-50%)",
            background: "#7b2fff", padding: "4px 12px", borderRadius: "20px",
            fontSize: "12px", fontWeight: 700, color: "#fff",
            animation: "pulse 0.5s ease-in-out infinite"
          }}>
            {activeSkill.icon} {activeSkill.name} ACTIVE!
          </div>
        )}
        
        {/* Events feed */}
        <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", gap: "4px" }}>
          {events.slice(0, 4).map((ev, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: "6px",
              background: ev.type === "goal" ? (ev.team === "my" ? "#00ff8822" : "#ff444422") : "#0d1a3a88",
              borderRadius: "6px", padding: "4px 8px",
              borderLeft: `3px solid ${ev.type === "goal" ? (ev.team === "my" ? "#00ff88" : "#ff4444") : "#1e3a5f"}`,
              opacity: 1 - i * 0.15
            }}>
              <span style={{ fontSize: "14px" }}>{ev.icon}</span>
              <span style={{ fontSize: "11px", color: "#ddd" }}>{ev.min}' {ev.player || ev.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stamina */}
      <div style={{ padding: "0 12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#64748b", marginBottom: "4px" }}>
          <span>⚡ Stamina</span><span>{Math.round(stamina)}%</span>
        </div>
        <div style={{ height: "6px", background: "#1e3a5f", borderRadius: "3px", overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: "3px",
            background: stamina > 60 ? "#00ff88" : stamina > 30 ? "#ff9500" : "#ff4444",
            width: `${stamina}%`, transition: "width 0.3s"
          }} />
        </div>
      </div>

      {/* Skill buttons */}
      <div style={{ padding: "12px", display: "flex", gap: "8px", overflowX: "auto" }}>
        {RPG_SKILLS.filter(s => s.type === "active").map(skill => (
          <button key={skill.id} onClick={() => useSkill(skill)} style={{
            background: "#0d1a3a", border: "1px solid #7b2fff44",
            borderRadius: "10px", padding: "8px 12px", cursor: "pointer",
            color: "#fff", fontFamily: "'Rajdhani', sans-serif",
            display: "flex", alignItems: "center", gap: "6px",
            fontSize: "12px", whiteSpace: "nowrap", flexShrink: 0
          }}>
            {skill.icon} {skill.name}
          </button>
        ))}
      </div>

      {/* Commentary-style log */}
      <div style={{ padding: "0 12px 12px" }}>
        <div style={{ background: "#0d1a3a", borderRadius: "10px", padding: "10px", fontSize: "12px", color: "#64748b", fontStyle: "italic" }}>
          {events[0] ? `${events[0].min}' — ${events[0].type === "goal" ? `GOAAAAAL! ${events[0].player} scores!` : events[0].text || "Foul committed!"}` : "Match is underway..."}
        </div>
      </div>
    </div>
  );
};

// --- TOURNAMENT ---
const TournamentScreen = ({ playerData, updatePlayer, gainXP, onBack }) => {
  const [tourPhase, setTourPhase] = useState("setup"); // setup, groups, knockout, champion
  const [groups, setGroups] = useState({});
  const [currentMatch, setCurrentMatch] = useState(null);
  const [bracket, setBracket] = useState(null);
  const myNation = NATIONS.find(n => n.name === playerData.selectedNation?.name);

  const initTournament = () => {
    // Create group standings
    const g = {};
    NATIONS.forEach(n => {
      if (!g[n.group]) g[n.group] = [];
      g[n.group].push({ ...n, gp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 });
    });
    // Simulate all group matches except player's
    Object.keys(g).forEach(groupKey => {
      const teams = g[groupKey];
      for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
          if (teams[i].name !== myNation?.name && teams[j].name !== myNation?.name) {
            const res = simulateMatch(teams[i].rating, teams[j].rating);
            if (res.result === "win") { teams[i].w++; teams[i].pts += 3; teams[j].l++; }
            else if (res.result === "draw") { teams[i].d++; teams[i].pts++; teams[j].d++; teams[j].pts++; }
            else { teams[j].w++; teams[j].pts += 3; teams[i].l++; }
            teams[i].gf += res.myGoals; teams[i].ga += res.oppGoals;
            teams[j].gf += res.oppGoals; teams[j].ga += res.myGoals;
            teams[i].gp++; teams[j].gp++;
          }
        }
      }
      g[groupKey] = teams.sort((a, b) => b.pts - a.pts || (b.gf - b.ga) - (a.gf - a.ga));
    });
    setGroups(g);
    setTourPhase("groups");
  };

  if (tourPhase === "setup") {
    return (
      <div style={{ minHeight: "100vh", background: "#050510", fontFamily: "'Rajdhani', sans-serif", color: "#fff" }}>
        <div style={{ background: "linear-gradient(135deg, #1a0a2e, #0d1a3a)", padding: "20px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
          <button onClick={onBack} style={{ background: "none", border: "1px solid #1e3a5f", borderRadius: "8px", color: "#aaa", padding: "6px 12px", cursor: "pointer", fontFamily: "'Rajdhani', sans-serif" }}>←</button>
          <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "16px", color: "#FFD700", margin: 0 }}>🏆 WORLD CUP 2026</h2>
        </div>
        
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
          <div style={{ fontSize: "80px", animation: "pulse 2s ease-in-out infinite" }}>🏆</div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "22px", fontWeight: 900, color: "#FFD700" }}>FIFA WORLD CUP</div>
            <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "32px", color: "#00d4ff" }}>2026</div>
            <div style={{ color: "#64748b", marginTop: "8px" }}>USA • Canada • Mexico</div>
          </div>
          
          <div style={{ background: "#0d1a3a", borderRadius: "12px", padding: "16px", width: "100%", maxWidth: "360px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", textAlign: "center" }}>
              <div><div style={{ fontSize: "24px", fontWeight: 700, color: "#FFD700" }}>48</div><div style={{ fontSize: "11px", color: "#64748b" }}>NATIONS</div></div>
              <div><div style={{ fontSize: "24px", fontWeight: 700, color: "#00d4ff" }}>16</div><div style={{ fontSize: "11px", color: "#64748b" }}>GROUPS</div></div>
              <div><div style={{ fontSize: "24px", fontWeight: 700, color: "#00ff88" }}>104</div><div style={{ fontSize: "11px", color: "#64748b" }}>MATCHES</div></div>
            </div>
          </div>
          
          {myNation ? (
            <button onClick={initTournament} style={{
              padding: "16px 48px", background: "linear-gradient(135deg, #FFD700, #FF6B00)",
              border: "none", borderRadius: "50px", cursor: "pointer",
              fontFamily: "'Orbitron', sans-serif", fontSize: "14px", fontWeight: 700, color: "#000"
            }}>
              START TOURNAMENT
            </button>
          ) : (
            <div style={{ color: "#ff4444", fontSize: "14px", textAlign: "center" }}>Select your nation first in the main menu</div>
          )}
        </div>
      </div>
    );
  }

  if (tourPhase === "groups") {
    const myGroup = myNation?.group;
    const myGroupTeams = groups[myGroup] || [];
    
    return (
      <div style={{ minHeight: "100vh", background: "#050510", fontFamily: "'Rajdhani', sans-serif", color: "#fff" }}>
        <div style={{ background: "linear-gradient(135deg, #1a0a2e, #0d1a3a)", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={onBack} style={{ background: "none", border: "1px solid #1e3a5f", borderRadius: "8px", color: "#aaa", padding: "6px 12px", cursor: "pointer", fontFamily: "'Rajdhani', sans-serif" }}>←</button>
          <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "14px", color: "#FFD700", margin: 0 }}>GROUP STAGE - GROUP {myGroup}</h2>
          <div style={{ width: "60px" }} />
        </div>
        
        <div style={{ padding: "16px" }}>
          <div style={{ background: "#0d1a3a", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
            <div style={{ background: "#1e3a5f", padding: "10px 12px", display: "grid", gridTemplateColumns: "1fr 30px 30px 30px 30px 30px", gap: "4px", fontSize: "11px", color: "#64748b", fontWeight: 700, letterSpacing: "1px" }}>
              <span>TEAM</span><span style={{ textAlign: "center" }}>GP</span><span style={{ textAlign: "center" }}>W</span><span style={{ textAlign: "center" }}>D</span><span style={{ textAlign: "center" }}>L</span><span style={{ textAlign: "center" }}>PTS</span>
            </div>
            {myGroupTeams.map((team, i) => (
              <div key={team.id} style={{
                padding: "10px 12px", display: "grid", gridTemplateColumns: "1fr 30px 30px 30px 30px 30px",
                gap: "4px", borderBottom: "1px solid #1e3a5f",
                background: team.name === myNation?.name ? "#00d4ff11" : "transparent",
                alignItems: "center"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{
                    width: "18px", height: "18px", background: i < 3 ? "#00ff8844" : "#ff444422",
                    borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "10px", color: i < 3 ? "#00ff88" : "#ff4444", fontWeight: 700
                  }}>{i + 1}</span>
                  <span style={{ fontSize: "16px" }}>{team.flag}</span>
                  <span style={{ fontSize: "12px", fontWeight: team.name === myNation?.name ? 700 : 400, color: team.name === myNation?.name ? "#00d4ff" : "#fff" }}>{team.name}</span>
                </div>
                {[team.gp, team.w, team.d, team.l, team.pts].map((v, vi) => (
                  <span key={vi} style={{ textAlign: "center", fontSize: "13px", color: vi === 4 ? "#FFD700" : "#aaa", fontWeight: vi === 4 ? 700 : 400 }}>{v}</span>
                ))}
              </div>
            ))}
          </div>
          
          {/* Play group matches */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {myGroupTeams.filter(t => t.name !== myNation?.name).map(opp => (
              <button key={opp.id} onClick={() => setCurrentMatch(opp)} style={{
                background: "#0d1a3a", border: "1px solid #1e3a5f", borderRadius: "10px",
                padding: "12px 16px", cursor: "pointer", display: "flex", alignItems: "center",
                justifyContent: "space-between", color: "#fff", fontFamily: "'Rajdhani', sans-serif"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "24px" }}>{myNation?.flag}</span>
                  <span style={{ fontWeight: 600 }}>{myNation?.name}</span>
                </div>
                <span style={{ color: "#00d4ff", fontFamily: "'Orbitron', sans-serif", fontSize: "12px" }}>PLAY</span>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontWeight: 600 }}>{opp.name}</span>
                  <span style={{ fontSize: "24px" }}>{opp.flag}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentMatch) {
    return (
      <MatchScreen
        playerData={playerData}
        opponent={currentMatch}
        onResult={(res) => {
          gainXP(res.xpGained);
          updatePlayer({
            coins: playerData.coins + res.coinsGained,
            wins: playerData.wins + (res.result === "win" ? 1 : 0),
            losses: playerData.losses + (res.result === "loss" ? 1 : 0),
            draws: playerData.draws + (res.result === "draw" ? 1 : 0),
          });
          setCurrentMatch(null);
        }}
        onBack={() => setCurrentMatch(null)}
      />
    );
  }

  return null;
};

// --- MY TEAM (ONLINE MODE) ---
const MyTeamScreen = ({ playerData, updatePlayer, onBack }) => {
  const [tab, setTab] = useState("squad");
  const [mySquad, setMySquad] = useState(playerData.myTeam || []);
  const [showPacks, setShowPacks] = useState(false);
  const [packResult, setPackResult] = useState(null);
  const [marketSearch, setMarketSearch] = useState("");

  const squadSlots = ["GK","RB","CB","CB","LB","CM","CDM","CAM","LW","ST","RW"];
  const availablePlayers = ALL_PLAYERS.filter(p => !mySquad.find(s => s.id === p.id));

  const openPack = (packType) => {
    const costs = { bronze: 500, silver: 1500, gold: 4000, premium: 10000 };
    const cost = costs[packType];
    if (playerData.myTeamCoins < cost) return;
    
    const rarities = { bronze: [0.85, 0.14, 0.01, 0], silver: [0.5, 0.4, 0.09, 0.01], gold: [0.1, 0.5, 0.35, 0.05], premium: [0, 0.1, 0.6, 0.3] };
    const r = rarities[packType];
    const rand = Math.random();
    let players = [];
    
    for (let i = 0; i < 5; i++) {
      let pool;
      const p = Math.random();
      if (p < r[0]) pool = ALL_PLAYERS.filter(pl => pl.rating < 78);
      else if (p < r[0] + r[1]) pool = ALL_PLAYERS.filter(pl => pl.rating >= 78 && pl.rating < 84);
      else if (p < r[0] + r[1] + r[2]) pool = ALL_PLAYERS.filter(pl => pl.rating >= 84 && pl.rating < 90);
      else pool = ALL_PLAYERS.filter(pl => pl.rating >= 90);
      
      if (pool && pool.length > 0) {
        players.push(pool[Math.floor(Math.random() * pool.length)]);
      }
    }
    
    updatePlayer({ myTeamCoins: playerData.myTeamCoins - cost, pack_openings: (playerData.pack_openings || 0) + 1 });
    setPackResult(players);
  };

  if (packResult) {
    return (
      <div style={{
        minHeight: "100vh", background: "#050510", fontFamily: "'Rajdhani', sans-serif",
        color: "#fff", display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "20px"
      }}>
        <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "18px", color: "#FFD700", marginBottom: "24px" }}>🎉 PACK OPENED!</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%", maxWidth: "360px" }}>
          {packResult.map((p, i) => (
            <div key={i} style={{
              background: "linear-gradient(135deg, #0d1a3a, #1a0a2e)",
              border: `1px solid ${ratingColor(p.rating)}44`,
              borderRadius: "10px", padding: "12px 16px",
              display: "flex", alignItems: "center", gap: "12px"
            }}>
              <div style={{
                width: "42px", height: "42px", background: ratingColor(p.rating),
                borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 900, fontSize: "18px", color: "#000"
              }}>{p.rating}</div>
              <div>
                <div style={{ fontWeight: 700 }}>{p.name}</div>
                <div style={{ fontSize: "12px", color: "#64748b" }}>{p.nation} • {p.pos}</div>
              </div>
              <button onClick={() => {
                setMySquad(prev => [...prev, p]);
                updatePlayer({ myTeam: [...mySquad, p] });
              }} style={{
                marginLeft: "auto", padding: "6px 12px", background: "#00ff8822",
                border: "1px solid #00ff88", borderRadius: "6px", cursor: "pointer",
                color: "#00ff88", fontSize: "11px", fontFamily: "'Rajdhani', sans-serif"
              }}>+ ADD</button>
            </div>
          ))}
        </div>
        <button onClick={() => setPackResult(null)} style={{
          marginTop: "20px", padding: "14px 32px", background: "linear-gradient(135deg, #FFD700, #FF6B00)",
          border: "none", borderRadius: "50px", cursor: "pointer",
          fontFamily: "'Orbitron', sans-serif", fontSize: "13px", fontWeight: 700, color: "#000"
        }}>CONTINUE</button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#050510", fontFamily: "'Rajdhani', sans-serif", color: "#fff", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(135deg, #1a0a2e, #0d1a3a)", padding: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
          <button onClick={onBack} style={{ background: "none", border: "1px solid #1e3a5f", borderRadius: "8px", color: "#aaa", padding: "6px 12px", cursor: "pointer", fontFamily: "'Rajdhani', sans-serif" }}>←</button>
          <div>
            <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "16px", color: "#00d4ff" }}>⚽ MY TEAM</div>
            <div style={{ fontSize: "11px", color: "#64748b" }}>Online • Ultimate Team Mode</div>
          </div>
          <div style={{ marginLeft: "auto", textAlign: "right" }}>
            <div style={{ color: "#FFD700", fontWeight: 700 }}>💰 {playerData.myTeamCoins.toLocaleString()}</div>
            <div style={{ fontSize: "11px", color: "#64748b" }}>MyTeam Coins</div>
          </div>
        </div>
        
        <div style={{ display: "flex", gap: "8px" }}>
          {["squad", "packs", "market", "online"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: "6px 12px", borderRadius: "20px", border: "1px solid",
              borderColor: tab === t ? "#00d4ff" : "#1e3a5f",
              background: tab === t ? "#00d4ff22" : "transparent",
              color: tab === t ? "#00d4ff" : "#888",
              fontSize: "12px", cursor: "pointer", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600,
              textTransform: "uppercase", letterSpacing: "1px"
            }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "12px" }}>
        {tab === "squad" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "13px", color: "#aaa" }}>MY SQUAD ({mySquad.length}/11)</div>
              <div style={{ color: "#FFD700", fontSize: "13px" }}>
                OVR {mySquad.length > 0 ? Math.round(mySquad.reduce((s, p) => s + p.rating, 0) / mySquad.length) : "—"}
              </div>
            </div>
            
            {/* Formation visualization */}
            <div style={{
              background: "linear-gradient(180deg, #1a3a1a, #0d2d0d)",
              borderRadius: "12px", padding: "12px", marginBottom: "16px",
              border: "1px solid #2d5a2d", minHeight: "160px", position: "relative"
            }}>
              <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "8px" }}>
                {mySquad.slice(0, 3).map((p, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ width: "36px", height: "36px", background: ratingColor(p.rating), borderRadius: "50%", margin: "0 auto 2px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "12px", color: "#000" }}>{p.rating}</div>
                    <div style={{ fontSize: "8px", color: "#aaa", width: "40px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name.split(" ").pop()}</div>
                  </div>
                ))}
              </div>
              {mySquad.length === 0 && (
                <div style={{ textAlign: "center", color: "#64748b", fontSize: "13px", padding: "20px" }}>Open packs to build your squad!</div>
              )}
            </div>

            {mySquad.map((p, i) => (
              <div key={i} style={{
                background: "#0d1a3a", border: "1px solid #1e3a5f", borderRadius: "10px",
                padding: "10px 12px", display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px"
              }}>
                <div style={{
                  width: "38px", height: "38px", background: ratingColor(p.rating),
                  borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 900, fontSize: "16px", color: "#000", flexShrink: 0
                }}>{p.rating}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: "13px" }}>{p.name}</div>
                  <div style={{ fontSize: "11px", color: "#64748b" }}>{p.nation} • {p.pos}</div>
                </div>
                <div style={{ textAlign: "right", fontSize: "11px", color: "#64748b" }}>
                  <div>⚡{p.pace} 🎯{p.shoot}</div>
                  <div>🎁{p.pass} 🌀{p.drib}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "packs" && (
          <div>
            <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "13px", color: "#aaa", marginBottom: "12px" }}>PLAYER PACKS</div>
            {[
              { type: "bronze", name: "Bronze Pack", cost: 500, color: "#CD7F32", desc: "5 players, some common" },
              { type: "silver", name: "Silver Pack", cost: 1500, color: "#C0C0C0", desc: "5 players, mix of ratings" },
              { type: "gold", name: "Gold Pack", cost: 4000, color: "#FFD700", desc: "5 players, guaranteed rare" },
              { type: "premium", name: "Premium Pack", cost: 10000, color: "#00d4ff", desc: "5 players, elite guaranteed" },
            ].map(pack => (
              <div key={pack.type} style={{
                background: "#0d1a3a", border: `1px solid ${pack.color}44`,
                borderRadius: "12px", padding: "16px", marginBottom: "10px",
                display: "flex", alignItems: "center", gap: "12px"
              }}>
                <div style={{
                  width: "52px", height: "52px", background: `linear-gradient(135deg, ${pack.color}44, ${pack.color}22)`,
                  borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px"
                }}>🎴</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: pack.color }}>{pack.name}</div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>{pack.desc}</div>
                  <div style={{ fontSize: "13px", color: "#FFD700", marginTop: "2px" }}>💰 {pack.cost.toLocaleString()}</div>
                </div>
                <button onClick={() => openPack(pack.type)} style={{
                  padding: "10px 16px", background: playerData.myTeamCoins >= pack.cost ? `linear-gradient(135deg, ${pack.color}, ${pack.color}aa)` : "#333",
                  border: "none", borderRadius: "8px", cursor: playerData.myTeamCoins >= pack.cost ? "pointer" : "not-allowed",
                  fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "13px", color: "#000"
                }}>OPEN</button>
              </div>
            ))}
          </div>
        )}

        {tab === "market" && (
          <div>
            <input
              value={marketSearch} onChange={e => setMarketSearch(e.target.value)}
              placeholder="Search players..."
              style={{
                width: "100%", padding: "10px 14px", background: "#0d1a3a",
                border: "1px solid #1e3a5f", borderRadius: "8px", color: "#fff",
                fontSize: "14px", boxSizing: "border-box", outline: "none", marginBottom: "12px"
              }}
            />
            <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "11px", color: "#64748b", marginBottom: "8px" }}>TRANSFER MARKET</div>
            {ALL_PLAYERS.filter(p => p.name.toLowerCase().includes(marketSearch.toLowerCase()) && marketSearch.length > 1).slice(0, 20).map((p, i) => (
              <div key={i} style={{
                background: "#0d1a3a", border: "1px solid #1e3a5f", borderRadius: "10px",
                padding: "10px 12px", display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px"
              }}>
                <div style={{
                  width: "38px", height: "38px", background: ratingColor(p.rating),
                  borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 900, fontSize: "16px", color: "#000"
                }}>{p.rating}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: "13px" }}>{p.name}</div>
                  <div style={{ fontSize: "11px", color: "#64748b" }}>{p.nation} • {p.pos}</div>
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "#FFD700" }}>💰 {p.value.toLocaleString()}</div>
                  <button onClick={() => {
                    if (playerData.myTeamCoins >= p.value && !mySquad.find(s => s.id === p.id)) {
                      setMySquad(prev => [...prev, p]);
                      updatePlayer({ myTeam: [...mySquad, p], myTeamCoins: playerData.myTeamCoins - p.value });
                    }
                  }} style={{
                    padding: "4px 10px", background: "#00ff8822",
                    border: "1px solid #00ff88", borderRadius: "6px", cursor: "pointer",
                    color: "#00ff88", fontSize: "11px", fontFamily: "'Rajdhani', sans-serif", marginTop: "2px"
                  }}>BUY</button>
                </div>
              </div>
            ))}
            {marketSearch.length <= 1 && (
              <div style={{ textAlign: "center", color: "#64748b", padding: "40px 20px" }}>
                <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</div>
                <div>Search for a player to buy them</div>
              </div>
            )}
          </div>
        )}

        {tab === "online" && (
          <div>
            <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "13px", color: "#00d4ff", marginBottom: "12px" }}>ONLINE MODES</div>
            {[
              { icon: "🌍", name: "Division Rivals", desc: "Climb divisions online", reward: "+500 coins/match", color: "#00d4ff" },
              { icon: "🏆", name: "Champions Cup", desc: "Weekend tournament mode", reward: "Rare packs", color: "#FFD700" },
              { icon: "⚔️", name: "Squad Battles", desc: "Battle AI squads", reward: "+200 coins/win", color: "#7b2fff" },
              { icon: "🔄", name: "FUT Draft", desc: "Pick the best squad", reward: "Mega packs", color: "#00ff88" },
            ].map((mode, i) => (
              <div key={i} style={{
                background: "#0d1a3a", border: `1px solid ${mode.color}33`,
                borderRadius: "12px", padding: "16px", marginBottom: "10px",
                display: "flex", alignItems: "center", gap: "12px"
              }}>
                <div style={{ fontSize: "36px" }}>{mode.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: mode.color }}>{mode.name}</div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>{mode.desc}</div>
                  <div style={{ fontSize: "11px", color: "#00ff88", marginTop: "2px" }}>🎁 {mode.reward}</div>
                </div>
                <button style={{
                  padding: "10px 14px", background: `linear-gradient(135deg, ${mode.color}44, ${mode.color}22)`,
                  border: `1px solid ${mode.color}`, borderRadius: "8px", cursor: "pointer",
                  color: mode.color, fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "12px"
                }}>PLAY</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- RPG SCREEN ---
const RPGScreen = ({ playerData, updatePlayer, gainXP, onBack }) => {
  const [tab, setTab] = useState("skills");
  const myNation = NATIONS.find(n => n.name === playerData.selectedNation?.name);

  const unlockSkill = (skill) => {
    if (playerData.skillPoints < skill.cost) return;
    if (playerData.unlockedSkills.includes(skill.id)) return;
    updatePlayer({
      unlockedSkills: [...playerData.unlockedSkills, skill.id],
      skillPoints: playerData.skillPoints - skill.cost
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#050510", fontFamily: "'Rajdhani', sans-serif", color: "#fff", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(135deg, #1a0a2e, #0d1a3a)", padding: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
          <button onClick={onBack} style={{ background: "none", border: "1px solid #1e3a5f", borderRadius: "8px", color: "#aaa", padding: "6px 12px", cursor: "pointer", fontFamily: "'Rajdhani', sans-serif" }}>←</button>
          <div>
            <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "16px", color: "#7b2fff" }}>⚔️ CAREER RPG</div>
            <div style={{ fontSize: "11px", color: "#64748b" }}>Level up • Unlock skills</div>
          </div>
          <div style={{ marginLeft: "auto", textAlign: "right" }}>
            <div style={{ color: "#7b2fff", fontWeight: 700 }}>🔮 {playerData.skillPoints} SP</div>
          </div>
        </div>

        {/* Player card */}
        <div style={{
          background: "linear-gradient(135deg, #2a1a3e, #1a2a4a)",
          borderRadius: "12px", padding: "16px",
          border: "1px solid #7b2fff44"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "56px", height: "56px",
              background: "linear-gradient(135deg, #7b2fff, #00d4ff)",
              borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "28px"
            }}>{myNation?.flag || "⚽"}</div>
            <div>
              <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "16px", fontWeight: 700 }}>{playerData.name}</div>
              <div style={{ color: "#7b2fff" }}>Level {playerData.level} Manager</div>
              <div style={{ fontSize: "12px", color: "#64748b" }}>{myNation?.name || "No nation"}</div>
            </div>
            <div style={{ marginLeft: "auto", textAlign: "center" }}>
              <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "24px", color: "#FFD700" }}>{playerData.wins}</div>
              <div style={{ fontSize: "10px", color: "#64748b" }}>WINS</div>
            </div>
          </div>
          
          {/* XP bar */}
          <div style={{ marginTop: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#64748b", marginBottom: "4px" }}>
              <span>XP Progress</span><span>{playerData.xp}/{playerData.xpNeeded}</span>
            </div>
            <div style={{ height: "8px", background: "#1e3a5f", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: "4px",
                background: "linear-gradient(90deg, #7b2fff, #00d4ff)",
                width: `${(playerData.xp / playerData.xpNeeded) * 100}%`
              }} />
            </div>
          </div>
        </div>
        
        <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
          {["skills", "stats", "achievements"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: "6px 12px", borderRadius: "20px", border: "1px solid",
              borderColor: tab === t ? "#7b2fff" : "#1e3a5f",
              background: tab === t ? "#7b2fff22" : "transparent",
              color: tab === t ? "#7b2fff" : "#888",
              fontSize: "12px", cursor: "pointer", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600,
              textTransform: "uppercase"
            }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "12px" }}>
        {tab === "skills" && (
          <div>
            <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "12px" }}>
              Skill Points: <span style={{ color: "#7b2fff", fontWeight: 700 }}>{playerData.skillPoints}</span> available
            </div>
            {RPG_SKILLS.map(skill => {
              const unlocked = playerData.unlockedSkills.includes(skill.id);
              const canAfford = playerData.skillPoints >= skill.cost;
              return (
                <div key={skill.id} style={{
                  background: unlocked ? "linear-gradient(135deg, #2a1a3e, #1a2a4a)" : "#0d1a3a",
                  border: `1px solid ${unlocked ? "#7b2fff" : "#1e3a5f"}`,
                  borderRadius: "10px", padding: "14px", marginBottom: "8px",
                  display: "flex", alignItems: "center", gap: "12px"
                }}>
                  <div style={{ fontSize: "30px" }}>{skill.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: unlocked ? "#7b2fff" : "#fff" }}>{skill.name}</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>{skill.desc}</div>
                    <div style={{ fontSize: "11px", color: "#ff9500", marginTop: "2px" }}>
                      {skill.type === "active" ? "🟡 Active" : "🔵 Passive"} • {skill.cost} SP
                    </div>
                  </div>
                  <button onClick={() => unlockSkill(skill)} style={{
                    padding: "8px 14px",
                    background: unlocked ? "#7b2fff44" : canAfford ? "linear-gradient(135deg, #7b2fff, #00d4ff)" : "#333",
                    border: "none", borderRadius: "8px", cursor: unlocked || !canAfford ? "not-allowed" : "pointer",
                    color: unlocked ? "#7b2fff" : "#fff",
                    fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "12px"
                  }}>
                    {unlocked ? "✓" : `UNLOCK`}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {tab === "stats" && (
          <div>
            {[
              { label: "Matches Played", val: playerData.wins + playerData.losses + playerData.draws, icon: "⚽" },
              { label: "Wins", val: playerData.wins, icon: "✅" },
              { label: "Win Rate", val: `${playerData.wins + playerData.losses + playerData.draws > 0 ? Math.round((playerData.wins / (playerData.wins + playerData.losses + playerData.draws)) * 100) : 0}%`, icon: "📊" },
              { label: "Total Coins Earned", val: playerData.coins.toLocaleString(), icon: "💰" },
              { label: "Packs Opened", val: playerData.pack_openings || 0, icon: "🎴" },
              { label: "Skills Unlocked", val: playerData.unlockedSkills.length, icon: "🔮" },
              { label: "Player Level", val: playerData.level, icon: "⭐" },
            ].map((s, i) => (
              <div key={i} style={{
                background: "#0d1a3a", border: "1px solid #1e3a5f",
                borderRadius: "10px", padding: "14px", marginBottom: "8px",
                display: "flex", alignItems: "center", gap: "12px"
              }}>
                <span style={{ fontSize: "24px" }}>{s.icon}</span>
                <span style={{ flex: 1, color: "#aaa" }}>{s.label}</span>
                <span style={{ fontWeight: 700, color: "#FFD700", fontFamily: "'Orbitron', sans-serif" }}>{s.val}</span>
              </div>
            ))}
          </div>
        )}

        {tab === "achievements" && (
          <div>
            {[
              { name: "First Whistle", desc: "Play your first match", done: playerData.wins + playerData.losses + playerData.draws > 0, icon: "⚽" },
              { name: "Clean Sheet", desc: "Win a match without conceding", done: false, icon: "🛡️" },
              { name: "Hat-trick Hero", desc: "Score 3+ goals in a match", done: false, icon: "🎩" },
              { name: "World Champion", desc: "Win the World Cup", done: false, icon: "🏆" },
              { name: "Pack Lucky", desc: "Open 10 packs", done: (playerData.pack_openings || 0) >= 10, icon: "🎴" },
              { name: "Skill Master", desc: "Unlock 5 skills", done: playerData.unlockedSkills.length >= 5, icon: "🔮" },
              { name: "Veteran", desc: "Reach Level 10", done: playerData.level >= 10, icon: "⭐" },
            ].map((a, i) => (
              <div key={i} style={{
                background: a.done ? "linear-gradient(135deg, #1a3a1a, #0d2d0d)" : "#0d1a3a",
                border: `1px solid ${a.done ? "#00ff88" : "#1e3a5f"}`,
                borderRadius: "10px", padding: "14px", marginBottom: "8px",
                display: "flex", alignItems: "center", gap: "12px",
                opacity: a.done ? 1 : 0.6
              }}>
                <span style={{ fontSize: "28px" }}>{a.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: a.done ? "#00ff88" : "#fff" }}>{a.name}</div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>{a.desc}</div>
                </div>
                {a.done && <span style={{ marginLeft: "auto", color: "#00ff88", fontSize: "20px" }}>✓</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- NATIONS SCREEN ---
const NationsScreen = ({ onBack }) => {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  
  if (selected) {
    const players = ALL_PLAYERS.filter(p => p.nation === selected.name);
    return (
      <div style={{ minHeight: "100vh", background: "#050510", fontFamily: "'Rajdhani', sans-serif", color: "#fff" }}>
        <div style={{ background: "linear-gradient(135deg, #1a0a2e, #0d1a3a)", padding: "16px" }}>
          <button onClick={() => setSelected(null)} style={{ background: "none", border: "1px solid #1e3a5f", borderRadius: "8px", color: "#aaa", padding: "6px 12px", cursor: "pointer", fontFamily: "'Rajdhani', sans-serif" }}>← Back</button>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "12px" }}>
            <span style={{ fontSize: "56px" }}>{selected.flag}</span>
            <div>
              <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "20px" }}>{selected.name}</div>
              <div style={{ color: "#64748b" }}>{selected.region} • Group {selected.group}</div>
              <div style={{ marginTop: "4px" }}>
                <span style={{ background: ratingColor(selected.rating), borderRadius: "4px", padding: "2px 8px", fontSize: "12px", fontWeight: 700, color: "#000" }}>OVR {selected.rating}</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ padding: "12px", overflowY: "auto" }}>
          <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "12px", color: "#64748b", marginBottom: "10px" }}>SQUAD</div>
          {players.map((p, i) => (
            <div key={i} style={{
              background: "#0d1a3a", border: "1px solid #1e3a5f", borderRadius: "10px",
              padding: "10px 12px", display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px"
            }}>
              <div style={{ width: "38px", height: "38px", background: ratingColor(p.rating), borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "16px", color: "#000" }}>{p.rating}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{p.name}</div>
                <div style={{ fontSize: "11px", color: "#64748b" }}>{p.pos} • {p.special}</div>
              </div>
              <div style={{ fontSize: "10px", color: "#64748b", textAlign: "right" }}>
                <div>⚡{p.pace} 🎯{p.shoot}</div>
                <div>🎁{p.pass} 🌀{p.drib}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#050510", fontFamily: "'Rajdhani', sans-serif", color: "#fff" }}>
      <div style={{ background: "linear-gradient(135deg, #1a0a2e, #0d1a3a)", padding: "16px" }}>
        <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
          <button onClick={onBack} style={{ background: "none", border: "1px solid #1e3a5f", borderRadius: "8px", color: "#aaa", padding: "6px 12px", cursor: "pointer", fontFamily: "'Rajdhani', sans-serif" }}>←</button>
          <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "16px", color: "#ff6b35", margin: 0 }}>🌍 48 NATIONS</h2>
        </div>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search..."
          style={{ width: "100%", padding: "10px 14px", background: "#0d1a3a", border: "1px solid #1e3a5f", borderRadius: "8px", color: "#fff", fontSize: "14px", boxSizing: "border-box", outline: "none" }}
        />
      </div>
      <div style={{ overflowY: "auto", padding: "12px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
        {NATIONS.filter(n => n.name.toLowerCase().includes(search.toLowerCase())).map(n => (
          <button key={n.id} onClick={() => setSelected(n)} style={{
            background: "#0d1a3a", border: "1px solid #1e3a5f", borderRadius: "10px",
            padding: "12px 8px", cursor: "pointer", color: "#fff",
            fontFamily: "'Rajdhani', sans-serif", textAlign: "center"
          }}>
            <div style={{ fontSize: "30px" }}>{n.flag}</div>
            <div style={{ fontSize: "11px", fontWeight: 600, marginTop: "4px" }}>{n.name}</div>
            <div style={{ background: ratingColor(n.rating), borderRadius: "3px", padding: "1px 4px", fontSize: "10px", fontWeight: 700, color: "#000", marginTop: "4px", display: "inline-block" }}>{n.rating}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

// --- PLAYERS SCREEN ---
const PlayersScreen = ({ onBack }) => {
  const [search, setSearch] = useState("");
  const [posFilter, setPosFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("rating");
  const positions = ["ALL", "GK", "CB", "LB", "RB", "CDM", "CM", "CAM", "LW", "RW", "ST"];

  const filtered = ALL_PLAYERS
    .filter(p =>
      (posFilter === "ALL" || p.pos === posFilter) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) || p.nation.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => b[sortBy] - a[sortBy])
    .slice(0, 50);

  return (
    <div style={{ minHeight: "100vh", background: "#050510", fontFamily: "'Rajdhani', sans-serif", color: "#fff", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(135deg, #1a0a2e, #0d1a3a)", padding: "16px" }}>
        <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
          <button onClick={onBack} style={{ background: "none", border: "1px solid #1e3a5f", borderRadius: "8px", color: "#aaa", padding: "6px 12px", cursor: "pointer", fontFamily: "'Rajdhani', sans-serif" }}>←</button>
          <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "16px", color: "#ff2d78", margin: 0 }}>⭐ PLAYERS</h2>
        </div>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search player or nation..."
          style={{ width: "100%", padding: "10px 14px", background: "#0d1a3a", border: "1px solid #1e3a5f", borderRadius: "8px", color: "#fff", fontSize: "14px", boxSizing: "border-box", outline: "none", marginBottom: "8px" }}
        />
        <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "4px" }}>
          {positions.map(pos => (
            <button key={pos} onClick={() => setPosFilter(pos)} style={{
              padding: "4px 10px", borderRadius: "20px", border: "1px solid",
              borderColor: posFilter === pos ? "#ff2d78" : "#1e3a5f",
              background: posFilter === pos ? "#ff2d7822" : "transparent",
              color: posFilter === pos ? "#ff2d78" : "#888",
              fontSize: "11px", cursor: "pointer", whiteSpace: "nowrap", fontFamily: "'Rajdhani', sans-serif"
            }}>{pos}</button>
          ))}
        </div>
      </div>
      
      <div style={{ flex: 1, overflowY: "auto", padding: "12px" }}>
        {filtered.map((p, i) => (
          <div key={i} style={{
            background: "#0d1a3a", border: "1px solid #1e3a5f", borderRadius: "10px",
            padding: "10px 12px", display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px"
          }}>
            <div style={{ width: "38px", height: "38px", background: ratingColor(p.rating), borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "16px", color: "#000", flexShrink: 0 }}>{p.rating}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: "13px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>{p.nation} • {p.pos} • {p.special}</div>
            </div>
            <div style={{ fontSize: "10px", color: "#64748b", textAlign: "right", flexShrink: 0 }}>
              <div>⚡{p.pace} 🎯{p.shoot} 🎁{p.pass}</div>
              <div>🌀{p.drib} 🛡️{p.def} 💪{p.phys}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- QUICK MATCH ---
const QuickMatchSetup = ({ playerData, updatePlayer, gainXP, onBack }) => {
  const [opponent, setOpponent] = useState(null);
  const [matchActive, setMatchActive] = useState(false);
  const myNation = NATIONS.find(n => n.name === playerData.selectedNation?.name);
  
  const pickOpponent = () => {
    const others = NATIONS.filter(n => n.name !== myNation?.name);
    setOpponent(others[Math.floor(Math.random() * others.length)]);
    setMatchActive(true);
  };

  if (matchActive && opponent) {
    return (
      <MatchScreen
        playerData={playerData}
        opponent={opponent}
        onResult={(res) => {
          gainXP(res.xpGained);
          updatePlayer({
            coins: playerData.coins + res.coinsGained,
            wins: playerData.wins + (res.result === "win" ? 1 : 0),
            losses: playerData.losses + (res.result === "loss" ? 1 : 0),
            draws: playerData.draws + (res.result === "draw" ? 1 : 0),
          });
          setMatchActive(false);
          setOpponent(null);
          onBack();
        }}
        onBack={() => { setMatchActive(false); onBack(); }}
      />
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#050510", fontFamily: "'Rajdhani', sans-serif", color: "#fff" }}>
      <div style={{ background: "linear-gradient(135deg, #1a0a2e, #0d1a3a)", padding: "16px" }}>
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={onBack} style={{ background: "none", border: "1px solid #1e3a5f", borderRadius: "8px", color: "#aaa", padding: "6px 12px", cursor: "pointer", fontFamily: "'Rajdhani', sans-serif" }}>←</button>
          <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "16px", color: "#00ff88", margin: 0 }}>⚽ QUICK MATCH</h2>
        </div>
      </div>
      
      <div style={{ padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "56px" }}>{myNation?.flag || "🏳️"}</div>
            <div style={{ fontWeight: 700 }}>{myNation?.name || "You"}</div>
            <div style={{ color: "#FFD700", fontSize: "13px" }}>OVR {myNation?.rating}</div>
          </div>
          <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "24px", color: "#00d4ff" }}>VS</div>
          <div style={{ textAlign: "center", minWidth: "100px" }}>
            {opponent ? (
              <>
                <div style={{ fontSize: "56px" }}>{opponent.flag}</div>
                <div style={{ fontWeight: 700 }}>{opponent.name}</div>
                <div style={{ color: "#ff9500", fontSize: "13px" }}>OVR {opponent.rating}</div>
              </>
            ) : (
              <div style={{ fontSize: "56px", opacity: 0.3 }}>❓</div>
            )}
          </div>
        </div>
        
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={pickOpponent} style={{
            padding: "16px 32px", background: "linear-gradient(135deg, #FFD700, #FF6B00)",
            border: "none", borderRadius: "50px", cursor: "pointer",
            fontFamily: "'Orbitron', sans-serif", fontSize: "14px", fontWeight: 700, color: "#000"
          }}>
            🎲 RANDOM MATCH
          </button>
        </div>

        <div style={{ width: "100%", maxWidth: "360px" }}>
          <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "12px", color: "#64748b", marginBottom: "10px" }}>CHOOSE OPPONENT</div>
          <div style={{ maxHeight: "300px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "6px" }}>
            {NATIONS.filter(n => n.name !== myNation?.name).map(n => (
              <button key={n.id} onClick={() => { setOpponent(n); setMatchActive(true); }} style={{
                background: "#0d1a3a", border: "1px solid #1e3a5f", borderRadius: "8px",
                padding: "10px 12px", cursor: "pointer", display: "flex", alignItems: "center",
                gap: "10px", color: "#fff", fontFamily: "'Rajdhani', sans-serif"
              }}>
                <span style={{ fontSize: "22px" }}>{n.flag}</span>
                <span style={{ flex: 1, textAlign: "left", fontWeight: 600 }}>{n.name}</span>
                <span style={{ background: ratingColor(n.rating), borderRadius: "4px", padding: "2px 6px", fontSize: "11px", fontWeight: 700, color: "#000" }}>{n.rating}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MAIN APP
// ============================================================
export default function WorldCup2026Game() {
  const { screen, setScreen, playerData, updatePlayer, gainXP } = useGameState();
  const [playerName, setPlayerName] = useState("Manager");

  const handleSplashStart = () => setScreen("setup");

  const handleSetup = () => {
    updatePlayer({ name: playerName });
    setScreen("nation_select");
  };

  const handleNationSelect = (nation) => {
    updatePlayer({ selectedNation: nation });
    setScreen("main");
  };

  if (screen === "splash") return <SplashScreen onStart={handleSplashStart} />;

  if (screen === "setup") {
    return (
      <div style={{
        minHeight: "100vh", background: "#050510", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", fontFamily: "'Rajdhani', sans-serif", color: "#fff", padding: "24px"
      }}>
        <div style={{ fontSize: "60px", marginBottom: "20px" }}>⚽</div>
        <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "20px", color: "#00d4ff", marginBottom: "8px" }}>WELCOME</div>
        <div style={{ color: "#64748b", marginBottom: "24px", textAlign: "center" }}>Enter your manager name to begin</div>
        <input
          value={playerName} onChange={e => setPlayerName(e.target.value)}
          placeholder="Your name..."
          maxLength={20}
          style={{
            width: "100%", maxWidth: "300px", padding: "14px 16px", background: "#0d1a3a",
            border: "1px solid #1e3a5f", borderRadius: "10px", color: "#fff",
            fontSize: "16px", boxSizing: "border-box", outline: "none",
            fontFamily: "'Rajdhani', sans-serif", marginBottom: "16px", textAlign: "center"
          }}
        />
        <button onClick={handleSetup} style={{
          padding: "14px 40px", background: "linear-gradient(135deg, #FFD700, #FF6B00)",
          border: "none", borderRadius: "50px", cursor: "pointer",
          fontFamily: "'Orbitron', sans-serif", fontSize: "14px", fontWeight: 700, color: "#000"
        }}>CONTINUE →</button>
      </div>
    );
  }

  if (screen === "nation_select") {
    return <NationSelect onSelect={handleNationSelect} playerData={playerData} />;
  }

  if (screen === "main") {
    return <MainMenu playerData={playerData} setScreen={setScreen} />;
  }

  if (screen === "tournament") {
    return <TournamentScreen playerData={playerData} updatePlayer={updatePlayer} gainXP={gainXP} onBack={() => setScreen("main")} />;
  }

  if (screen === "quickmatch") {
    return <QuickMatchSetup playerData={playerData} updatePlayer={updatePlayer} gainXP={gainXP} onBack={() => setScreen("main")} />;
  }

  if (screen === "myteam") {
    return <MyTeamScreen playerData={playerData} updatePlayer={updatePlayer} onBack={() => setScreen("main")} />;
  }

  if (screen === "rpg") {
    return <RPGScreen playerData={playerData} updatePlayer={updatePlayer} gainXP={gainXP} onBack={() => setScreen("main")} />;
  }

  if (screen === "nations") {
    return <NationsScreen onBack={() => setScreen("main")} />;
  }

  if (screen === "players") {
    return <PlayersScreen onBack={() => setScreen("main")} />;
  }

  return null;
}
