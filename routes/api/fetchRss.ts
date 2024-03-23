import express, {Request, Response} from "express";
import Parser from 'rss-parser';

import { RelevantRSS } from "../../models/RelevantRSS";

const router = express.Router();
const parser = new Parser();

router.get('/rss', async (req: Request, res: Response) => {
  let feed = await parser.parseURL('https://feeds.megaphone.fm/newheights');
  let results: RelevantRSS[] = [];

  feed.items.forEach(item => {
    const newResult: RelevantRSS = {
      title: item.title,
      description: item.description || item.content,
      link: item.link,
      image: item.image || undefined,
    }

    results.push(newResult);
  });

  res.send(results);
})

export default router;

