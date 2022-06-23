#!/bin/bash
set -e

destination_directory=$1
database=$2

declare -A bodies
bodies=(
    [148]="Ale"
    [183]="Alingsås"
    [57]="Ekerö"
    [238]="Filipstad"
    [176]="Forshaga"
    [9]="Hofors"
    [229]="Kil"
    [271]="Klippan"
    [160]="Lessebo"
    [185]="Lysekil"
    [6]="Ockelbo"
    [92]="Skurup"
    [39]="Sollentuna"
    [84]="Surahammar"
    [173]="Östra Göinge"
)

all_file=$(mktemp)

# Extract all data as CSV to temporary file
psql --command="\COPY (SELECT problem.id AS \"ID\", body.id AS \"BodyId\", body.name AS \"Kommun\", to_char(confirmed, 'YYYY-MM-DD') || 'T' || to_char(confirmed, 'HH24:MI:SS') || '+0100' AS \"Bekräftat\", problem.category AS \"Kategori\", CASE WHEN state IN ('fixed - council', 'fixed - user', 'closed') THEN 'Stängd, löst' WHEN state IN ('not responsible', 'unable to fix', 'closed', 'duplicate', 'hidden') THEN 'Stängd, ej löst' ELSE 'Öppen' END AS \"Status\", CASE WHEN state IN ('fixed - council', 'fixed - user', 'closed', 'not responsible', 'unable to fix', 'closed', 'duplicate', 'hidden') THEN ((SELECT created FROM comment WHERE problem_id = problem.id AND problem_state IN ('fixed - council', 'fixed - user', 'closed', 'not responsible', 'unable to fix', 'closed', 'duplicate', 'hidden') ORDER BY created ASC LIMIT 1)::date - whensent::date) ELSE (now()::date - whensent::date) END AS \"Dagar till första stängning (stängd) eller nu (öppen)\", ((SELECT created FROM comment WHERE problem_id = problem.id AND user_id IN (SELECT id FROM users WHERE from_body = problem.bodies_str::integer) ORDER BY created ASC LIMIT 1)::date - whensent::date) AS \"Dagar till första förvaltningssvar\", CASE WHEN lastupdate > whensent THEN 'Ja' ELSE 'Nej' END AS \"Uppdaterad sedan utskick\", COALESCE(NULLIF(service, ''), 'Webb') AS \"App\" FROM problem, body WHERE confirmed >= '2015-01-01' AND problem.bodies_str::integer = body.id AND confirmed IS NOT NULL ORDER BY confirmed) TO $all_file WITH CSV HEADER ENCODING 'latin1';" ${database}

for i in "${!bodies[@]}"; do
    body_file=$(mktemp)
    ./extract-body.sh $all_file ${i} $body_file
    ./csv-to-json.sh $body_file ${destination_directory}/${i}.json
    rm $body_file
done

rm $all_file

all_count_file=$(mktemp)

# Extract only confirmed, body name and body id for all bodies
psql --command="\COPY (SELECT body.id as \"bodyid\", body.name AS \"municipality\", to_char(confirmed, 'YYYY-MM-DD') || 'T' || to_char(confirmed, 'HH24:MI:SS') || '+0100' AS \"confirmed\" FROM problem, body WHERE problem.confirmed >= '2015-01-01' AND problem.bodies_str::integer = body.id AND problem.confirmed IS NOT NULL ORDER BY confirmed) TO $all_count_file WITH CSV HEADER ENCODING 'utf8';" ${database}

./csv-json.py -i $all_count_file -o ${destination_directory}/all_count.json -f pretty

rm $all_count_file

echo "var bodies = [" > ${destination_directory}/bodies.js
for i in "${!bodies[@]}"; do
    body_file=$(mktemp)
    echo '{' >> ${destination_directory}/bodies.js
    echo 'id: ' ${i} ',' >> ${destination_directory}/bodies.js
    echo 'name: "'${bodies[$i]}'",' >> ${destination_directory}/bodies.js
    echo '},' >> ${destination_directory}/bodies.js
    rm $body_file
done
echo "];" >> ${destination_directory}/bodies.js
