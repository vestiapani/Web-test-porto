"use server";

import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";

export async function deleteProject(id: string) {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function addProject(formData: FormData) {

}
