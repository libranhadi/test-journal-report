import { executeQuery } from '../helper/QueryHelper';

const getJournalById = async (id: number) => {
    const query = 'SELECT * FROM journals WHERE id = ? AND deleted_at IS NULL';
    const result = await executeQuery(query, [id]);
    if (result.length === 0) {
        throw new Error('Journal not found');
    }
    return result[0]
};

const store = async (data: {
    master_journal_id: number;
    user_id: number;
    description: string;
    date: string;
    amount: number;
    created_at: Date;
    updated_at: Date;
}) => {
    try {
        const query = `
            INSERT INTO journals (master_journal_id, user_id, description, date, amount, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `;
        const result = await executeQuery(query, [
            data.master_journal_id,
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

const updateJournal = async (id: number, data: {
    master_journal_id?: number;
    user_id?: number;
    description?: string;
    date?: string;
    amount?: number;
    updated_at: Date;
}) => {
    try {
        const query = `
            UPDATE journals
            SET 
                master_journal_id = COALESCE(?, master_journal_id),
                user_id = COALESCE(?, user_id),
                description = COALESCE(?, description),
                date = COALESCE(?, date),
                amount = COALESCE(?, amount),
                updated_at = ?
            WHERE id = ?;
        `;
        
        const params = [
            data.master_journal_id ?? null,
            data.user_id ?? null,
            data.description ?? null,
            data.date ?? null,
            data.amount ?? null,
            data.updated_at,
            id
        ];

        return await executeQuery(query, params);
    } catch (error) {
        console.error('Error storing journal entry:', error);
        throw error; 
    }
};


const deleteJournalById = async (id: number) => {
    const query = 'DELETE FROM journals WHERE id = ?';
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
    softDeleteJournalById,
    updateJournal,
};
