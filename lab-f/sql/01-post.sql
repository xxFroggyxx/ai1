create table post
(
    id      integer not null
        constraint post_pk
            primary key autoincrement,
    subject text not null,
    content text not null
);

create table course
(
    id      integer not null
        constraint course_pk
            primary key autoincrement,
    subject text not null,
    content text not null,
    date text not null
);