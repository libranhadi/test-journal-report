import { executeQuery } from "../helper/QueryHelper";

const getMasterDataJournalById = async (id: number) => {
    const query = 'SELECT * FROM master_journals WHERE id = ?';
    const result = await executeQuery(query, [id]);
    if (result.length === 0) {
        throw new Error('Invalid field description');
    }
    return result[0]
};
export default {
    getMasterDataJournalById
};