import pool from '../config/database';

export async function getConnection() {
    return pool.getConnection(); 
}


export async function executeQuery(queryString: string, params: any[]): Promise<any> {
    const connection = await getConnection();
    try {
        const [results] = await connection.execute(queryString, params);
        return results;
    } finally {
        connection.release(); 
    }
}
