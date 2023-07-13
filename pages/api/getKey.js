export default async function handler(req, res) {
    // console.log(process.env.API_KEY);
    // const response = await fetch(process.env.API_KEY)
    // const data = response.json()
    // return res.json({data})
    res.status(200).json({ key: process.env.API_KEY })

 }