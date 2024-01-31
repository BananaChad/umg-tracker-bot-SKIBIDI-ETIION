(async () => {
	await connect(process.env.mongoose).catch(console.error);
})();