import React from 'react';

const Leaderboard = ({ players }) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const topThree = sortedPlayers.slice(0, 3);
  const remaining = sortedPlayers.slice(3, 10);

  return (
    <div className="bg-slate-900 text-white p-8 min-h-screen">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-2">Top Players</h2>
        <p className="text-gray-400 mb-8">The cream of the crop leading the charge.</p>
        
        <div className="flex justify-center items-end gap-4 max-w-4xl mx-auto">
          {/* Silver - 2nd place */}
          <div className="bg-slate-800 border-2 border-blue-600 rounded-xl p-6 text-center scale-95">
            <div className="w-20 h-20 bg-gray-400 rounded-full -mt-10 mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🏆</span>
            </div>
            <h3 className="text-xl mb-1">{topThree[1]?.name}</h3>
            <span className="text-gray-400 text-sm">#2</span>
            <div className="bg-gray-700 h-2 rounded-full my-4 overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: `${(topThree[1]?.score / 100) * 100}%` }}></div>
            </div>
            <div className="text-3xl font-bold text-blue-600">{topThree[1]?.score}</div>
          </div>

          {/* Gold - 1st place */}
          <div className="bg-slate-800 border-2 border-yellow-500 rounded-xl p-6 text-center scale-110">
            <div className="w-20 h-20 bg-yellow-500 rounded-full -mt-10 mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🏆</span>
            </div>
            <h3 className="text-xl mb-1">{topThree[0]?.name}</h3>
            <span className="text-gray-400 text-sm">#1</span>
            <div className="bg-gray-700 h-2 rounded-full my-4 overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: `${(topThree[0]?.score / 100) * 100}%` }}></div>
            </div>
            <div className="text-3xl font-bold text-blue-600">{topThree[0]?.score}</div>
          </div>

          {/* Bronze - 3rd place */}
          <div className="bg-slate-800 border-2 border-blue-600 rounded-xl p-6 text-center scale-95">
            <div className="w-20 h-20 bg-amber-600 rounded-full -mt-10 mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🏆</span>
            </div>
            <h3 className="text-xl mb-1">{topThree[2]?.name}</h3>
            <span className="text-gray-400 text-sm">#3</span>
            <div className="bg-gray-700 h-2 rounded-full my-4 overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: `${(topThree[2]?.score / 100) * 100}%` }}></div>
            </div>
            <div className="text-3xl font-bold text-blue-600">{topThree[2]?.score}</div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">All Players</h2>
        <div className="bg-slate-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-900">
              <tr>
                <th className="p-4 text-left text-gray-400 font-semibold text-sm">RANK</th>
                <th className="p-4 text-left text-gray-400 font-semibold text-sm">PLAYER</th>
                <th className="p-4 text-left text-gray-400 font-semibold text-sm">SCORE</th>
              </tr>
            </thead>
            <tbody>
              {remaining.map((player, index) => (
                <tr key={player.id} className="border-b border-slate-700 hover:bg-slate-700">
                  <td className="p-4">{index + 4}</td>
                  <td className="p-4">{player.name}</td>
                  <td className="p-4">{player.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
