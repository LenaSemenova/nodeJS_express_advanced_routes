async function handler(req, res) {

    console.log('Entered the serverless function')

    return { "dummy": "data"}
}

export default handler;