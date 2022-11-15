FROM postgres:latest
ENV POSTGRES_PASSWORD='1111'
ENV POSTGRES_USER='postgres'
ENV POSTGRES_DB='testdb'
ENV POSTGRES_HOST='localhost'
COPY create_fixtures.sql /docker-entrypoint-initdb.d/create_fixtures.sql