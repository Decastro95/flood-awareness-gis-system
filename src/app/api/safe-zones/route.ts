import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data } = await supabase
    .from("safe_zones")
    .select(`
      name,
      capacity,
      location
    `);

  const formatted = data?.map((z: any) => ({
    name: z.name,
    capacity: z.capacity,
    longitude: z.location.coordinates[0],
    latitude: z.location.coordinates[1],
  }));

  return Response.json(formatted);
}
