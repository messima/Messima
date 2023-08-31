import Database from "tauri-plugin-sql-api"

let db: Database

Database.load(`sqlite:tasks.db`).then((res) => {
  db = res
})

async function createTaskTable() {
  return await db.execute(`CREATE TABLE tasks (
        id INTEGER PRIMARY KEY,
        title TEXT,
        description TEXT,
        done INTEGER,
        dueDate TEXT, 
        tags TEXT,
        category TEXT,
        location TEXT
      );
      
      INSERT INTO tasks VALUES 
        (1, 'Grocery shopping', 'Buy milk, eggs, bread, fruits and vegetables', 0, '2023-08-28', 'errands,groceries', 'chores', 'Grocery store'),
        (2, 'Pay bills', 'Pay electric, phone and credit card bills online', 0, '2023-08-31', 'finance,utilities', 'finance', NULL),
        (3, 'Take dog for a walk', 'Take Charlie on a 30 minute walk around the neighborhood', 0, '2023-08-27', 'pets,exercise', 'chores', 'Neighborhood park'),
        (4, 'Doctor appointment', 'See Dr. Smith for annual physical exam', 0, '2023-09-01', 'health,medical', 'errands', "Doctor's office"),
        (5, 'Car maintenance', 'Get oil change and inspection', 0, '2023-09-05', 'auto,mechanic', 'errands', 'Auto shop'),
        (6, 'Meeting with boss', 'Discuss Q3 sales goals and plans', 0, '2023-08-29', 'work,manager', 'work', 'Office'),
        (7, 'Pick up dry cleaning', 'Grab clothes left at cleaners last week', 0, '2023-08-30', 'errands', 'chores', 'Cleaners'),
        (8, 'Finish sales proposal', 'Complete draft and submit for review', 0, '2023-09-02', 'work,sales', 'work', NULL),
        (9, 'Call plumber','Schedule appointment to fix kitchen sink leak', 0, '2023-08-28', 'home,repairs', 'chores', 'Home'),
        (10, 'Submit conference presentation','Complete draft and submit by abstract deadline', 0, '2023-09-15', 'work,conference', 'work', NULL),
        (11, 'Sign up for yoga class','Register for Tuesday evening beginner yoga', 0, '2023-08-29', 'exercise,health', 'personal', 'Yoga studio'),
        (12, 'Call mom','Return mom''s phone call from last week', 0, '2023-08-28', 'family,personal', 'personal', NULL),
        (13, 'Research new laptops','Compare models, prices and reviews', 0, '2023-09-10', 'shopping,electronics', 'shopping', NULL),
        (14, 'Clean out garage','Organize, declutter and get rid of unused items', 0, '2023-09-03', 'home,chores', 'chores', 'Garage'),
        (15, 'Plan vacation','Research hotels, flights, activities for Hawaii trip', 0, '2023-09-30', 'travel,leisure', 'personal', 'Hawaii'),
        (16, 'Study for exam','Review chapters 5-8, practice sample questions', 0, '2023-09-18', 'education,test', 'school', NULL),
        (17, 'Volunteer at food bank','Help pack donated food boxes on Saturday 9-11am', 0, '2023-09-02', 'volunteer,charity', 'volunteer', 'Food bank'), 
        (18, 'Pick up medication','Stop by pharmacy to get prescription refill', 0, '2023-08-29', 'health,errands', 'errands', 'Pharmacy'),
        (19, 'Haircut appointment','Get trim and style for wedding next week', 0, '2023-09-05', 'personal,hair', 'personal', 'Hair salon'),
        (20, 'Fix dad''s computer','Troubleshoot network connectivity issue', 0, '2023-09-04', 'family,tech support', 'family', 'Dad''s house');`)
}

async function createOne(task: Task) {
  try {
    return await db.execute(
      `INSERT into tasks (id,title, description,tags,done) VALUES(${
        task.id
      }, "${task.title}", "${task.description}", "${task.tags}", ${Number(
        task.done,
      )})`,
    )
  } catch (err) {
    console.log(err)
  }
}

async function readAll() {
  const res = <[]>await db.select(`SELECT * FROM tasks`)

  return res.map((task: any) => {
    if (task.tags === null) {
      return task
    } else {
      return {
        ...task,
        tags: task.tags.split(","),
        done: Boolean(task.done),
      }
    }
  })
}

async function readOne(id: number) {
  try {
    const res: any = <[{}]>(
      await db.select(`SELECT * FROM tasks WHERE id = ${id}`)
    )
    res[0].done = Boolean(res[0].done)
    if (res[0].tags) {
      res[0].tags = res[0].tags.split(`,`)
    }
    return res[0]
  } catch (err) {
    console.log(err)
  }
}

async function updateOne(task: Task) {
  const cmd = `UPDATE tasks
    SET title = "${task.title}",
        description = "${task.description}",
        done = ${Number(task.done)}
    WHERE id = ${task.id}`

  try {
    return await db.execute(cmd)
  } catch (err) {
    console.log(err)
  }
}

async function deleteOne(id: number) {
  try {
    return await db.execute(`DELETE FROM tasks WHERE id = ${id}`)
  } catch (err) {
    console.log(err)
  }
}

export async function isTableExist() {
  try {
    await db.select(`SELECT * FROM tasks LIMIT 1`)
    return true
  } catch {
    return false
  }
}

export default {
  readAll,
  updateOne,
  createTaskTable,
  createOne,
  readOne,
  deleteOne,
  isTableExist,
}
