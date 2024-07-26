import journalRepository from '../repositories/JournalRepository';
import { getConnection } from '../helper/QueryHelper';
import userRepository from '../repositories/UserRepository';
import masterJournalRepository from '../repositories/MasterJournalRepository';
import journalHistoryRepository from '../repositories/JournalHistoryRepository';

const getJournalById = async (id: number) => {
    if (isNaN(id) || id <= 0) {
        throw new Error('Invalid ID parameter');
    }
    const results = await journalRepository.getJournalById(id);
    return results;
};

const storeJournal = async (data) => {
    if (data.amount < 0) {
        throw new Error('Amount cannot be negative');
    }
    

    const now = new Date();
    const connection = await getConnection();
    try {
        const user = await userRepository.getUserById(1)
        const masterDataJournal = await masterJournalRepository.getMasterDataJournalById(data.master_journal_id)
        await connection.beginTransaction();

        data.user_id = user.id
        data.description = masterDataJournal.description

        const result = await journalRepository.store({
            ...data,
            created_at: now,
            updated_at: now
        });

        const journalId = result.insertId; 

        await journalHistoryRepository.store({
            journal_id: journalId,
            ...data,
            created_at: now,
            updated_at: now
        });

        await connection.commit();
    } catch (error) {
        console.log(error)
        await connection.rollback();
        throw error;
    }
};


const updateJournal = async (id : number, data) => {
    if (data.amount < 0) {
        throw new Error('Amount cannot be negative');
    }
    

    const now = new Date();
    const connection = await getConnection();
    try {
        const journalDetail = await journalRepository.getJournalById(id);
        const user = await userRepository.getUserById(1)
        const masterDataJournal = await masterJournalRepository.getMasterDataJournalById(data.master_journal_id)
        await connection.beginTransaction();

        data.user_id = user.id
        data.description = masterDataJournal.description

        const result = await journalRepository.updateJournal(journalDetail.id, {
            ...data,
            created_at: now,
            updated_at: now
        });

        await journalHistoryRepository.store({
            journal_id: journalDetail.id,
            ...data,
            created_at: now,
            updated_at: now
        });

        await connection.commit();
    } catch (error) {
        console.log(error)
        await connection.rollback();
        throw error;
    }
};

const deleteJournalById = async (id: number) => {
    if (isNaN(id) || id <= 0) {
        throw new Error('Invalid ID parameter');
    }
    try {
        const result = await journalRepository.getJournalById(id);
        await journalRepository.softDeleteJournalById(result.id);
    } catch (error) {
        throw error;
    }
};

export default {
    getJournalById,
    storeJournal,
    deleteJournalById,
    updateJournal
};
