#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ARCHIVE="${TMPDIR:-/tmp}/shellvault-project.tar.gz"
EXPECTED_SHA256="74681c34e5111fddd532b22de8ce6a2f072c5b31834f03b35c7d1842743f3310"

cd "$ROOT_DIR"
cat .bootstrap/part-* | base64 --decode > "$ARCHIVE"
printf '%s  %s\n' "$EXPECTED_SHA256" "$ARCHIVE" | sha256sum --check --status

tar --extract --gzip --file "$ARCHIVE" --directory "$ROOT_DIR"
printf 'ShellVault source files extracted and verified.\n'
