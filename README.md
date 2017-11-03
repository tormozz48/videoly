# videoly
videoly test task

## Usage

* clone repo: `git clone https://github.com/tormozz48/videoly.git`
* move to project folder: `cd videoly`
* install npm dependencies: `npm install`

Run database population command:
```bash
node bin/videoly populate -dbName {your database name}
```

Possible options are:

```bash
Usage:
  videoly populate [OPTIONS] [ARGS]


Options:
  -h, --help : Help
  -dbName DBNAME, --dbName=DBNAME : database name (required)
  -dbUser USER, --dbUser=USER : database user name
  -dbPassword PASSWORD, --dbPassword=PASSWORD : database user password
  -dbHost HOST, --dbHost=HOST : database host
  -rows ROWS, --rows=ROWS : number of rows to populate
  -products PRODUCTS, --products=PRODUCTS : number of unique products
  -visitors VISITORS, --visitors=VISITORS : number of unique visitors
```

* Default user is `postgress` (password is omitted).
* Default host is `localhost`
* Number of rows is set to 1000000
* Number of unique products is calculated as 0.2 of rows number
* Number of unique visitors is calculated as 0.7 of rows number

#### Solution for `SQL` task

Corresponded SQL query is [here](./unique-products.sql)

```sql
SELECT COUNT(DISTINCT product_id) as unique_visited_products
	FROM pageviews
	WHERE time BETWEEN '2017-06-01' AND '2017-07-01'
	AND EXISTS(SELECT NULL FROM atc_clicks WHERE pageviews.id = atc_clicks.impression_id)
```

In my case this query returns result `53336`

#### Solution for "Fetch data" task

Run conversion command:
```bash
node bin/videoly conversion -dbName {your database name}
```

Possible options are:
```bash
Usage:
  videoly conversion [OPTIONS] [ARGS]

Options:
  -h, --help : Help
  -dbName DBNAME, --dbName=DBNAME : database name (required)
  -dbUser USER, --dbUser=USER : database user name
  -dbPassword PASSWORD, --dbPassword=PASSWORD : database user password
  -dbHost HOST, --dbHost=HOST : database host
```

* Default user is `postgress` (password is omitted).
* Default host is `localhost`

This script returned following data:
```bash
Records found: 28559' for July and "shop1.com" url pattern
Calculated conversions amount: 28487
```

## Test exercise for the backend developer

Imagine you have a database with two tables `A` ("pageviews") and `B` ("atc_clicks"), each table has about 1M of rows in it and any row in `A` may have zero or many related rows in `B`.
Your task is to fetch all rows from `B` joined with rows in `A`, process them on the backend and calculate aggregated result.

* Table `A` (aka "pageviews")

Stores info about every visit on product description page) Columns: `id`, `time`, `product_id`, `visitor_id`, `browser_name`, `url`.

* Table `B` (aka "atc_clicks")

Stores raw data about clicks on "Add to cart" button). Linked to table `A` via `impression_id`. Columns: `id`, `impression_id`, `click_id`, `local_time`.


### Tasks

#### Populate

Please write a script that will populate tables `A` and `B` with nearly random data, assuming you should get 1 million of rows in every table.

* There should be around 700'000 unique `visitor_id` and about 200.000 unique `product_id` in table `A`.
* For `url` column please use hostnames from this set: ["localhost", "127.0.0.2", "google.com", "shop1.com", "shop2.com", "www.shop1.com", "www.google.com", "shop4.ru", "www3.shop4.ru"].
And append any valid random path to it so that you get massive amount of valid random URLs that are from specific hostnames. Schema (https / http) should also vary randomly.
* About 50% of rows in the table `A` should not have related rows in table `B`.
* Every row in `B` must have only one row in `A` (one click can't happen on several page views.
* Some impressions (table `A`) will have between 1 and 6 clicks in table `B` - decide that randomly.
* Define time for every row in `A` randomly between `1.1.2017` and `31.08.2017`.
* Time for `B` should be shifted from `A`.time to any reasonable random interval into the future (clicks happen after page view).

#### SQL

Please write SQL queries that prove that you populated the database according to the requirements. How many unique products were visited in June? Please write SQL query for that.
Share the queries via GitHub.

#### Fetch data

Now you have almost real data about product page visits and clicks. Let's calculate something useful. Please write JS script that calculates the following:
Let's define a "conversion" as a unique combination of `product_id` and date for the given shop (one shop means hostnames like `www.shop.com` and `shop.com`).
**How many conversions are there for `shop1.com` (including www. version) that were made in July?**

Here you should fetch data from the DB, filter out something and make calculations on the backend. Feel free to modify data structure as you think necessary.