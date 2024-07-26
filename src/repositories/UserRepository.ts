import { executeQuery } from "../helper/QueryHelper";

const getUserById = async (userId: number) => {
    const query = 'SELECT * FROM users WHERE id = ? AND deleted_at IS NULL';
    const result = await executeQuery(query, [userId]);
    if (result.length === 0) {
        throw new Error('User not found');
    }
    return result[0]
};
export default {
    getUserById
};