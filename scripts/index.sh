#!bin/sh

bun tsx scripts/banner.ts

bun tsx scripts/add-db-path.ts

bun tsx db/schema.ts

bun tsx db/seed.ts