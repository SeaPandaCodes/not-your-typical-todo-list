import {pool} from './db';


expory asynx createSampeTasks(userId: string) {

  const task = []

  pool.query(`INSERT INTO tasks.........`, [userId, task])

}
