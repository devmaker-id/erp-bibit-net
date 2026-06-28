"use server";

import { getCurrentSession } from "../utils";

export async function currentAuth() {
  return getCurrentSession();
}

