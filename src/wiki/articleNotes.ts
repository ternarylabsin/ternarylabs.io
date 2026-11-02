/** Keep source provenance available without making it part of the article narrative. */
export function splitArticleNotes(notes: string[] = []) {
  const sourcePrefixes = [
    'Inherits from parent Def ',
    'Vanilla parent ',
    'Patch-authored ',
    'Statistics combine ',
    'Artwork updated ',
    'Converted standard belt uses ',
    'Native Core 1.7 fields are sourced ',
    'Mass is from the recorded ',
    'Override selected primary variant ',
    'Starter biography pool is configured ',
    'Native audit confirms ',
  ]
  return {
    gameplay: notes.filter((note) => !sourcePrefixes.some((prefix) => note.startsWith(prefix))),
    sources: notes.filter((note) => sourcePrefixes.some((prefix) => note.startsWith(prefix))),
  }
}
