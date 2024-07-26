import { Request, Response } from 'express';
import journalService from '../services/JournalService';


const getJournalById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const results = await journalService.getJournalById(parseInt(id));
        res.json(results);
    } catch (error) {
        if (error.message === 'Journal not found') {
            res.status(404).json({ message: 'Journal not found' });
        } else if (error.message === 'Invalid ID parameter') {
            res.status(400).json({ message: 'Invalid ID parameter' });
        } else {
            res.status(500).json({ message: 'Sorry, Something went wrong please try again later!' });
        }
    }
};

const createJournal = async (req: Request, res: Response) => {

    try {
        const { master_journal_id, date, amount } = req.body;
        await journalService.storeJournal({
            master_journal_id,
            date,
            amount
        });
        res.status(201).json({ message: 'Journal created successfully' });
    } catch (error) {
        if (error.message != '' && error.message != null && error.message != undefined) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Error creating journal' });
        }
    }
};


const updateJournal = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { master_journal_id, user_id, description, date, amount } = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid journal ID' });
    }

    if (amount < 0) {
        return res.status(400).json({ message: 'Amount cannot be negative' });
    }

    try {
        const now = new Date();
        
        // Call the service to update the journal entry
        await journalService.updateJournal(id, {
            master_journal_id,
            user_id,
            description,
            date,
            amount,
            updated_at: now
        });

        res.status(200).json({ message: 'Journal entry updated successfully' });
    } catch (error) {
        console.error('Error updating journal entry:', error);
        res.status(500).json({ message: 'Error updating journal entry' });
    }
};


const deleteJournalById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await journalService.deleteJournalById(parseInt(id, 10));
        res.status(204).send(); 
    } catch (error) {
        if (error.message === 'Journal not found') {
            res.status(404).json({ message: 'Journal not found' });
        } else if (error.message === 'Invalid ID parameter') {
            res.status(400).json({ message: 'Invalid ID parameter' });
        } else {
            res.status(500).json({ message: 'Sorry, Something went wrong please try again later!' });
        }
    }
};

export default {
    getJournalById,
    deleteJournalById,
    createJournal,
    updateJournal
};
