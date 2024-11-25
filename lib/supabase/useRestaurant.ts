import { createSupabaseClient } from "./client";

const supabase = createSupabaseClient();

export const useRestaurant = () => {
  async function getLatestCustomers() {
    const { data, error } = await supabase
      .from("customersAtRestaurantsV2")
      .select("customers")
      .eq("restaurants", "Timmies");

    if (error || !data) {
      throw new Error("Failed to get latest customer data");
    }

    return data;
  }

  return { getLatestCustomers };
};
