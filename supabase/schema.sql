create table if not exists personas ( id bigserial primary key, name text not null, voice text default '', rules text default '', is_default boolean default false );
create table if not exists templates ( id bigserial primary key, type_key text unique not null, type_label text not null, structure text default '' );
create table if not exists members ( email text primary key, active boolean default false );
alter table personas enable row level security; alter table templates enable row level security; alter table members enable row level security;
create policy "personas_read" on personas for select using (true); create policy "templates_read" on templates for select using (true);
create policy "members_no_public" on members for all using (false);
insert into personas (name, voice, rules, is_default) values ('Padrão Clínica','voz acolhedora, profissional e simples','evitar termos médicos sensíveis; focar em benefícios e segurança; CTAs curtos',true) on conflict do nothing;


-- v1.2: add name to members
alter table if exists members add column if not exists name text default '';


-- v1.3: user profiles (name, phone)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  first_name text default '',
  last_name text default '',
  phone text default '',
  created_at timestamp with time zone default now()
);

alter table profiles enable row level security;

-- RLS: a user can read/update own profile
create policy "profiles_self_select" on profiles for select using (auth.uid() = id);
create policy "profiles_self_update" on profiles for update using (auth.uid() = id);
create policy "profiles_self_insert" on profiles for insert with check (auth.uid() = id);
