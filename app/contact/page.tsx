import React from "react";
import { getSiteSettings } from "@/lib/settings";
import { ContactClient } from "./contact-client";

export default async function ContactPage() {
  const settings = await getSiteSettings();
  return <ContactClient settings={settings} />;
}
