import express, { Request, Response } from 'express';
import journalController from './controller/JournalController';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'UP' });
});

app.post('/journals', journalController.createJournal);
app.put('/journals/:id', journalController.updateJournal);
app.delete('/journals/:id', journalController.deleteJournalById);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});