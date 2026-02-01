### ❓ Questions

> Given a Customer table and an Order table, can you write a SQL query to retrieve country-wise order analytics?
> How would you calculate the total number of orders placed per country?
> Can you identify the highest and lowest order amount for each country?
> How would you compute the average order value country-wise?
> Can you determine the total number of unique customers per country?
> How would you count orders whose amount is greater than 1000 and less than 5000 for each country?
> Finally, how would you sort the results based on country name?

### 📝 Answer

```sql
SELECT
    c.country,                                       -- Country-wise grouping
    COUNT(o.order_id) AS total_orders,               -- Total number of orders
    MAX(o.order_amount) AS highest_order_amount,     -- Highest order amount
    MIN(o.order_amount) AS lowest_order_amount,      -- Lowest order amount
    AVG(o.order_amount) AS average_order_value,      -- Average order value
    COUNT(DISTINCT c.customer_id) AS total_customers,-- Total unique customers
    SUM(
        CASE
            WHEN o.order_amount > 1000
             AND o.order_amount < 5000
            THEN 1
            ELSE 0
        END
    ) AS orders_between_1000_and_5000                 -- Orders between 1000 and 5000
FROM customer c
JOIN orders o
    ON c.customer_id = o.customer_id                 -- Joining customer and order tables
GROUP BY c.country                                   -- Grouping by country
ORDER BY c.country;                                  -- Ordering result by country
```
