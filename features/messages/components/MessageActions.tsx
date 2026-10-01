"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Button, buttonClassName } from "@/components/ui/Button";
import { DeleteButton, FormStatus } from "@/features/dashboard/components/FormParts";
import type { ActionState } from "@/lib/action-state";
import { markMessage, removeMessage } from "../actions";

export type MessageActionsProps = {
  id: string;
  email: string;
  subject: string;
  read: boolean;
};

export function MessageActions({ id, email, subject, read }: MessageActionsProps) {
  const t = useTranslations("Dashboard.messages");
  const [state, setState] = useState<ActionState | null>(null);
  const [pending, startTransition] = useTransition();
  const replyHref = `mailto:${email}?subject=${encodeURIComponent(t("replySubject", { subject }))}`;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <a href={replyHref} className={buttonClassName()}>
          {t("reply")}
        </a>
        <Button
          variant="ghost"
          loading={pending}
          onClick={() =>
            startTransition(async () => {
              setState(await markMessage(id, !read));
            })
          }
        >
          {read ? t("markUnread") : t("markRead")}
        </Button>
        <DeleteButton action={() => removeMessage(id)} />
      </div>
      <FormStatus state={state} />
    </div>
  );
}
