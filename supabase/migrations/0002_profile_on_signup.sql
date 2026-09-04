-- Auto-create a profiles row whenever someone signs up, reading their chosen
-- role and display name off auth metadata (set by the sign-up form as
-- options.data.{role, display_name}). Runs inside the same transaction as
-- the auth.users insert, so it's already committed by the time the client's
-- signUp() call resolves.

create or replace function handle_new_user() returns trigger as $$
begin
  insert into public.profiles (id, role, display_name)
  values (
    new.id,
    coalesce((new.raw_user_meta_data->>'role')::user_role, 'seller'),
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
