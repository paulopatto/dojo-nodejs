# Streams 

Streams são uma boa forma de trabalhar com grande volumes de dados com NodeJS.


Usos: 

- Ler arquivos grandes 
- Processar grande volume de dados 
- Executar queries pesadas em banco de dados e processar resultados sob demanda 



## Arquivos de exemplos de dados 


Podemos usar alguns arquivos de dados de exemplos, peguei esses aqui de exemplos no repo [datablist/sample-csv-files](https://github.com/datablist/sample-csv-files) que tem versões de 100 até milhões de dados. Aqui vou manter neste repositório apenas as versões de 100, mas ficam os links das versões maiores que serão usadas nos testes também.

### Customers 

- [customers-100.csv](https://drive.google.com/uc?id=1zO8ekHWx9U7mrbx_0Hoxxu6od7uxJqWw&export=download) - [Zip version](https://drive.google.com/uc?id=1yyL20BNKv3PxJRJVjJ_2Q-HidvIUis45&export=download) - Customers CSV with 100 records
- [customers-1000.csv](https://drive.google.com/uc?id=1OT84-j5J5z2tHoUvikJtoJFInWmlyYzY&export=download) - [Zip version](https://drive.google.com/uc?id=17CIha7N1jOJWFd3G-CdlA5JplCnGj67x&export=download) - Customers CSV with 1000 records
- [customers-10000.csv](https://drive.google.com/uc?id=1x2IdSNcHGLmot9i1h90gwMJr5lULC2QV&export=download) - [Zip version](https://drive.google.com/uc?id=1peI5sBNUVN_Q7qhgZwwCEejpMR1NjOwd&export=download) - Customers CSV with 10000 records
- [customers-100000.csv](https://drive.google.com/uc?id=1N1xoxgcw2K3d-49tlchXAWw4wuxLj7EV&export=download) - [Zip version](https://drive.google.com/uc?id=1ZCVi_08A8W0f6q-2sVHDPyGzC0S7o4r4&export=download) - Customers CSV with 100000 records
- [customers-500000.csv](https://drive.google.com/uc?id=1f_lRSEobcCqoigHnc9mzli8fbK18loQm&export=download) - Customers CSV with 500000 records
- [customers-1000000.csv](https://drive.google.com/uc?id=16WH96smhIT0KK0ZVJRpjymLa_XDhKOoD&export=download) - Customers CSV with 1000000 records
- [customers-2000000.csv](https://drive.google.com/uc?id=1IXQDp8Um3d-o7ysZLxkDyuvFj9gtlxqz&export=download) - Customers CSV with 2000000 records



#### Schemas

- Index
- Customer Id
- First Name
- Last Name
- Company
- City
- Country
- Phone 1
- Phone 2
- Email
- Subscription Date
- Website

```
describe customers;
+-------------------+--------------+------+-----+---------+----------------+
| Field             | Type         | Null | Key | Default | Extra          |
+-------------------+--------------+------+-----+---------+----------------+
| id                | int(11)      | NO   | PRI | NULL    | auto_increment |
| customer_id       | varchar(255) | NO   | MUL | NULL    |                |
| first_name        | varchar(255) | NO   |     | NULL    |                |
| last_name         | varchar(255) | NO   |     | NULL    |                |
| company           | varchar(255) | NO   | MUL | NULL    |                |
| city              | varchar(255) | NO   | MUL | NULL    |                |
| country           | varchar(255) | NO   | MUL | NULL    |                |
| phone_1           | varchar(255) | NO   |     | NULL    |                |
| phone_2           | varchar(255) | YES  |     | NULL    |                |
| email             | varchar(255) | NO   | MUL | NULL    |                |
| subscription_date | date         | NO   | MUL | NULL    |                |
| website           | varchar(255) | YES  |     | NULL    |                |
+-------------------+--------------+------+-----+---------+----------------+
12 rows in set (0,00 sec)
```


### People

- [people-100.csv](https://drive.google.com/uc?id=1phaHg9objxK2MwaZmSUZAKQ8kVqlgng4&export=download) - [Zip version](https://drive.google.com/uc?id=1BVcEHEiXiXCcfG7CIbvX3EotJhDknSw-&export=download) - People CSV with 100 records
- [people-1000.csv](https://drive.google.com/uc?id=1AWPf-pJodJKeHsARQK_RHiNsE8fjPCVK&export=download) - [Zip version](https://drive.google.com/uc?id=1s3761PwSCu8JzTRUctOy8CtncfXry2V8&export=download) - People CSV with 1000 records
- [people-10000.csv](https://drive.google.com/uc?id=1VEi-dnEh4RbBKa97fyl_Eenkvu2NC6ki&export=download) - [Zip version](https://drive.google.com/uc?id=1lJD9_S2XwIVLWyNSDqcIpT8Bqt7408p-&export=download) - People CSV with 10000 records
- [people-100000.csv](https://drive.google.com/uc?id=1NW7EnwxuY6RpMIxOazRVibOYrZfMjsb2&export=download) - [Zip version](https://drive.google.com/uc?id=1yDP1I1cbiY8LrZdamdfwwVlM7di4SEE_&export=download) - People CSV with 100000 records
- [people-500000.csv](https://drive.google.com/uc?id=1gYcKeeF2KIx3jHsn-Egc_zjv-VaI4LFw&export=download) - People CSV with 500000 records
- [people-1000000.csv](https://drive.google.com/uc?id=1CUl7o2GAsNuMas2pyjqmz5CavGV08Mje&export=download) - People CSV with 1000000 records
- [people-2000000.csv](https://drive.google.com/uc?id=1fveqbEJIr4o4oMqswF03NA2Qrk1zF7v4&export=download) - People CSV with 2000000 records


#### Schema

- Index
- User Id `user_id`
- First Name `first_name`
- Last Name `last_name`
- Sex
- Email
- Phone
- Date of birth `date_of_birth`
- Job Title `job_title`



### Organizations

- [organizations-100.csv](https://drive.google.com/uc?id=13a2WyLoGxQKXbN_AIjrOogIlQKNe9uPm&export=download) - [Zip version](https://drive.google.com/uc?id=1FE22Q358zt0DPgJu-Bflo2FCXD1X_pxl&export=download) - Organizations CSV with 100 records
- [organizations-1000.csv](https://drive.google.com/uc?id=1AjP7Vy0apmPaBkMBzbtv_XiDATuoBJyg&export=download) - [Zip version](https://drive.google.com/uc?id=1nClHbAB2od_E4-Wx7V00ENLrNqsm_SDU&export=download) - Organizations CSV with 1000 records
- [organizations-10000.csv](https://drive.google.com/uc?id=13p-box0F9kou4wE9AyeBNKMSfE767xT-&export=download) - [Zip version](https://drive.google.com/uc?id=1Xi1_OLMLS4ehBG4CGeyMt4kSyxrcsW7p&export=download) - Organizations CSV with 10000 records
- [organizations-100000.csv](https://drive.google.com/uc?id=1g4wqEIsKyiBWeCAwd0wEkiC4Psc4zwFu&export=download) - [Zip version](https://drive.google.com/uc?id=1wtYMAcAHHwdgoSQoe6BJfTHDnkXrJt2d&export=download) - Organizations CSV with 100000 records
- [organizations-500000.csv](https://drive.google.com/uc?id=1w50f3dqKgzSqdeBhB8tXQHCmahq_a6cL&export=download) - Organizations CSV with 500000 records
- [organizations-1000000.csv](https://drive.google.com/uc?id=1uaUCN5vAMVz73RgfJykJzzlIq2yQTlYB&export=download) - Organizations CSV with 1000000 records
- [organizations-2000000.csv](https://drive.google.com/uc?id=18vlOi20KcMR328ewc2NBsoBNPrV3vL9Q&export=download) - Organizations CSV with 2000000 records

#### Schema

- Index
- Organization Id
- Name
- Website
- Country
- Description
- Founded
- Industry
- Number of employees
