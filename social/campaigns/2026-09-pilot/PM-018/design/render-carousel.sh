#!/bin/zsh
set -euo pipefail

script_dir="${0:A:h}"
render_tmp="$(mktemp -d /tmp/pm018-carousel.XXXXXX)"

for card in 01 02 03 04; do
  source_file="${script_dir}/pm-018_ig_carousel_${card}_v01.svg"
  qlmanage -t -s 1350 -o "${render_tmp}" "${source_file}" >/dev/null
  preview_file="${render_tmp}/$(basename "${source_file}").png"
  output_file="${script_dir}/pm-018_ig_carousel_${card}_v01.png"
  sips -c 1350 1080 "${preview_file}" --out "${output_file}" >/dev/null
done

sips -g pixelWidth -g pixelHeight "${script_dir}"/pm-018_ig_carousel_??_v01.png
