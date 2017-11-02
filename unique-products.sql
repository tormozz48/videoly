SELECT COUNT(DISTINCT product_id) as amount
	FROM pageviews
	WHERE time BETWEEN '2017-06-01' AND '2017-07-01'
	AND EXISTS(SELECT NULL FROM atc_clicks WHERE pageviews.id = atc_clicks.impression_id)