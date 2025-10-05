import React from "react";

const medalColors = [
	"bg-yellow-400 text-yellow-900", // Gold
	"bg-gray-300 text-gray-800",    // Silver
	"bg-amber-700 text-amber-100"   // Bronze
];

const medalEmojis = [
	"🥇", // Gold
	"🥈", // Silver
	"🥉"  // Bronze
];

function Leaderboard({ leaderData }) {
	// Convert object to array and sort by marks descending
	const leaders = Object.values(leaderData || {})
		.sort((a, b) => b.marks - a.marks)
		.slice(0, 10);

	return (
		<div className="w-100 px-10 mx-auto mt-10 p-6 bg-white rounded-2xl shadow-2xl border border-gray-100">
			<h2 className="text-3xl font-bold text-center mb-6 text-blue-700 tracking-wide">Leader- Board</h2>
			<ol className="space-y-3">
				{leaders.map((player, idx) => (
					<li
						key={player.name + idx}
						className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
							idx < 3 ? medalColors[idx] + " font-semibold shadow-md scale-105" : "bg-gray-50 hover:bg-blue-50"
						}`}
					>
						<div className="flex items-center gap-3">
							{idx < 3 && (
								<span className="text-2xl mr-2">{medalEmojis[idx]}</span>
							)}
							<span className="text-lg md:text-xl">{player.name}</span>
						</div>
						<span className="text-lg md:text-xl font-mono">{player.marks}</span>
					</li>
				))}
			</ol>
			{leaders.length === 0 && (
				<div className="text-center text-gray-400 mt-6">No data available</div>
			)}
		</div>
	);
}

export default Leaderboard;

