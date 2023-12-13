import pg from 'pg';
const {Pool} = pg;



const pool = new Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
  })


pool.connect((err) => {
    // if (err) throw err
    console.log('Connect to PostgreSQL successfully!')
})

  
// const poolConfig = process.env.DATABASE_URL? {
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnAuthorized: false
//     } 
// }   :
//     {
//         user: 'postgres',
//         password: '1234',
//         host: 'localhost',
//         port: '5432',
//         database: 'leaderboard'
//     }

// const pool = new Pool(poolConfig);
export default pool;