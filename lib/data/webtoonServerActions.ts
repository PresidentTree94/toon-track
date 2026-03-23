"use server";
import { deleteWebtoonFromReports } from "./webtoonServerQueries";

export async function deleteReportsAction() {
  await deleteWebtoonFromReports()
}
