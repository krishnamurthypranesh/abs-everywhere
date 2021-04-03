# Abs Everywhere
A webapp to generate programmes based on [volume cycles by Mark Wildman {who learnt it from Pavel Tsatsouline}](https://www.youtube.com/watch?v=USIGc3yQD7g).

It's still in the making. A lot of stuff to go.

# To do
* ~~Convert entire programme data to csv~~
* Add load variance for each session [Basically, lifting heavy in one session and light on the other]

   * Add work capacity (WC) calculations
   * Factor undulations introduced because of load variance to ETC of programme
* Add leeway for marking active recovery weeks
* Convert entire thing into web app with a frontend, backend and db

   * Frontend - HTML, vanilla JS and Nginx
   * Backend - Express
   * Db - Postgres (and maybe mongo to store data documents, because why not?)
   * Add docker-compose for the entire thing
