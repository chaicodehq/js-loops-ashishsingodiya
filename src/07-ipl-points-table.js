/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  if (!Array.isArray(matches) || matches.length === 0) return [];

  const resultObj = {};

  class Team {
    constructor(name) {
      this.team = name;
      this.played = 0;
      this.won = 0;
      this.lost = 0;
      this.tied = 0;
      this.noResult = 0;
      this.points = 0;
    }
  }

  for (const match of matches) {
    const team1 = match.team1;
    const team2 = match.team2;
    const result = match.result;

    let team1Obj = resultObj[team1];
    let team2Obj = resultObj[team2];

    if (!team1Obj) {
      team1Obj = new Team(team1);
      resultObj[team1] = team1Obj;
    }

    if (!team2Obj) {
      team2Obj = new Team(team2);
      resultObj[team2] = team2Obj;
    }

    team1Obj.played += 1;
    team2Obj.played += 1;

    if (result === "win") {
      const winner = match.winner;

      if (winner === team1) {
        team1Obj.won += 1;
        team2Obj.lost += 1;
        team1Obj.points += 2;
      } else {
        team2Obj.won += 1;
        team1Obj.lost += 1;
        team2Obj.points += 2;
      }
    }

    if (result === "tie") {
      team1Obj.tied += 1;
      team2Obj.tied += 1;
      team1Obj.points += 1;
      team2Obj.points += 1;
    }

    if (result === "no_result") {
      team1Obj.noResult += 1;
      team2Obj.noResult += 1;
      team1Obj.points += 1;
      team2Obj.points += 1;
    }
  }

  const resultArr = Array.from(Object.values(resultObj));
  const resultArrSorted = [...resultArr].sort((a, b) => {
    if (a.points - b.points !== 0) return b.points - a.points;
    else return a.team.localeCompare(b.team)
  });

  return resultArrSorted;
}
