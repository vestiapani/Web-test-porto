"use server";

import { createClient } from "../../lib/supabase-ssr";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect("/admin/login?error=true");

  revalidatePath("/admin", "layout");
  redirect("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/admin/login");
}

// === CRUD PROYEK ===

export async function addProject(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const github_url = formData.get("github_url") as string;
  const live_url = formData.get("live_url") as string;

  const techStackString = formData.get("tech_stack") as string;
  const tech_stack = techStackString
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean);

  let image_url = null;

  // PROSES UPLOAD GAMBAR BARU
  const imageFile = formData.get("image") as File;
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("portfolio-images")
      .upload(fileName, imageFile);

    if (!uploadError) {
      const { data } = supabase.storage
        .from("portfolio-images")
        .getPublicUrl(fileName);
      image_url = data.publicUrl;
    }
  }

  const { error } = await supabase
    .from("projects")
    .insert([
      { title, description, tech_stack, image_url, github_url, live_url },
    ]);

  if (error) return { success: false, message: error.message };

  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const github_url = formData.get("github_url") as string;
  const live_url = formData.get("live_url") as string;

  const techStackString = formData.get("tech_stack") as string;
  const tech_stack = techStackString
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean);

  // Ambil URL gambar yang sudah ada sebelumnya
  let image_url = formData.get("existing_image_url") as string;

  // PROSES UPLOAD GAMBAR (Jika User mengganti gambarnya)
  const imageFile = formData.get("image") as File;
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("portfolio-images")
      .upload(fileName, imageFile);

    if (!uploadError) {
      const { data } = supabase.storage
        .from("portfolio-images")
        .getPublicUrl(fileName);
      image_url = data.publicUrl;
    }
  }

  const { error } = await supabase
    .from("projects")
    .update({ title, description, tech_stack, image_url, github_url, live_url })
    .eq("id", id);

  if (error) return { success: false, message: error.message };

  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/");
}
