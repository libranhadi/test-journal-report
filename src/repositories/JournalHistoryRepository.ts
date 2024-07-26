import { executeQuery } from '../helper/QueryHelper';

const getJournalById = async (id: number) => {
    const query = 'SELECT * FROM journal_histories WHERE id = ? AND deleted_at IS NULL';
    const result = await executeQuery(query, [id]);
    if (result.length === 0) {
        throw new Error('Journal not found');
    }
    return result[0]
};

const store = async (data: {
    journal_id: number;
    user_id: number;
    description: string;
    date: string;
    amount: number;
    created_at: Date;
    updated_at: Date;
}) => {
    try {
        const query = `
            INSERT INTO journal_histories (journal_id, user_id, description, date, amount, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `;
        const result = await executeQuery(query, [
            data.journal_id,
            data.user_id,
            data.description,
            data.date,
            data.amount,
            data.created_at,
            data.updated_at
        ]);
        return result;
    } catch (error) {
        console.error('Error storing journal entry:', error);
        throw error; 
    }
};


const deleteJournalById = async (id: number) => {
    const query = 'DELETE FROM journal_histories WHERE id = ?';
    await executeQuery(query, [id]);
};
const softDeleteJournalById = async (id: number) => {
    const now = new Date(); 
    const query = 'UPDATE journals SET updated_at = ?, deleted_at = ? WHERE id = ?';
    await executeQuery(query, [now,now,id]);
};


export default {
    getJournalById,
    store,
    deleteJournalById,
    softDeleteJournalById
};
