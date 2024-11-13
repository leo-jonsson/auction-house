"use client";

import * as storage from "@/lib/utilities/storage";

export const loggedInUser = storage.load("user");
