const knex = require("knex")({
  client: "pg",
  connection: {
    host: "abs_db",
    user: "postgres",
    password: "password",
    database: "abs_everywhere",
    port: 5432,
    searchPath: ["public",],
  },
});

//const programme = [{
//  exercise: "Kettlebell Swing",
//  equipment: "Kettlebell",
//  start_date: new Date(Date.parse("2021-04-19")),
//  mass: 14,
//  mass_unit: "kilograms",
//  reps: 10,
//  baseline_sets: 10,
//  target_sets: 20,
//  days: ["tuesday", "friday",],
//  progression: 0.5,
//  loading: "bilateral",
//  exercise_type: "ballistic",
//  training_method: "EMOM",
//  rest: null,
//},];

// knex("programme").
//   insert(programme, "id").
//   then((programme_id) => {
//     console.log(`Programme id is: ${programme_id}`)
//   }).
//   catch((err) => {console.log(err)}).
//   finally(() => {knex.destroy()});


exports.knex = knex;
