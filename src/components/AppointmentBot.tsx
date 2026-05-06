import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck, MessageCircle, X, Send } from "lucide-react";
import { easePremium } from "@/lib/motion";

const slots = [
  "Mon · 10:00 AM",
  "Tue · 02:00 PM",
  "Wed · 11:30 AM",
  "Thu · 04:00 PM",
  "Fri · 09:30 AM",
];

const AppointmentBot = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"intro" | "slot" | "details" | "done">("intro");
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const reset = () => {
    setStep("intro");
    setSlot(null);
    setName("");
    setEmail("");
  };

  return (
    <>
      {/* Launcher */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label="Book an appointment"
        data-cursor-hover
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.6, ease: easePremium }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full text-dark shadow-[0_18px_40px_-12px_hsl(var(--gold)/0.6)] sm:bottom-7 sm:right-7 sm:h-16 sm:w-16"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--gold-light)) 0%, hsl(var(--gold)) 55%, hsl(var(--gold-deep)) 100%)",
          borderLeft: "2px solid hsl(var(--gold-deep))",
          borderBottom: "2px solid hsl(var(--gold-deep))",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3, ease: easePremium }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="cal"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3, ease: easePremium }}
            >
              <CalendarCheck className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.45, ease: easePremium }}
            className="fixed bottom-24 right-5 z-[60] flex w-[calc(100vw-2.5rem)] max-w-[360px] flex-col overflow-hidden rounded-2xl bg-cream shadow-[0_30px_80px_-20px_hsl(var(--dark)/0.35)] sm:bottom-28 sm:right-7"
            style={{
              borderLeft: "2px solid hsl(var(--gold))",
              borderBottom: "2px solid hsl(var(--gold))",
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-dark px-5 py-4 text-cream">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-dark">
                <MessageCircle className="h-4 w-4" />
              </span>
              <div className="flex-1">
                <div className="font-display-bold text-sm">Book an Appointment</div>
                <div className="font-mono-tag text-[10px] text-cream/60">
                  Replies in &lt; 24h
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="max-h-[60vh] overflow-y-auto bg-cream px-5 py-5">
              <AnimatePresence mode="wait">
                {step === "intro" && (
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: easePremium }}
                  >
                    <p className="font-body text-sm text-dark/85">
                      Hi 👋 Want to chat about your project? Pick a slot and we'll
                      send a calendar invite.
                    </p>
                    <button
                      data-cursor-hover
                      onClick={() => setStep("slot")}
                      className="btn-premium mt-5 !w-full !py-2.5 !text-sm"
                    >
                      Choose a slot →
                    </button>
                  </motion.div>
                )}

                {step === "slot" && (
                  <motion.div
                    key="slot"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: easePremium }}
                  >
                    <p className="font-mono-tag text-[10px] text-dark/60">
                      // Available this week
                    </p>
                    <div className="mt-3 grid gap-2">
                      {slots.map((s) => (
                        <button
                          key={s}
                          data-cursor-hover
                          onClick={() => {
                            setSlot(s);
                            setStep("details");
                          }}
                          className="flex items-center justify-between border border-dark/15 bg-cream px-4 py-2.5 text-left font-body text-sm text-dark transition-all hover:border-gold hover:bg-gold/10"
                        >
                          <span>{s}</span>
                          <span className="font-mono-tag text-[10px] text-gold">
                            30m
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === "details" && (
                  <motion.form
                    key="details"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: easePremium }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      setStep("done");
                    }}
                    className="space-y-3"
                  >
                    <div className="rounded-md bg-gold/15 px-3 py-2 font-mono-tag text-[10px] text-gold-deep">
                      Slot · {slot}
                    </div>
                    <input
                      required
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-dark/15 bg-cream px-3 py-2.5 font-body text-sm text-dark outline-none focus:border-gold"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-dark/15 bg-cream px-3 py-2.5 font-body text-sm text-dark outline-none focus:border-gold"
                    />
                    <button
                      type="submit"
                      data-cursor-hover
                      className="btn-premium !w-full !py-2.5 !text-sm"
                    >
                      <Send className="h-3.5 w-3.5" /> Confirm booking
                    </button>
                  </motion.form>
                )}

                {step === "done" && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: easePremium }}
                    className="text-center"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold text-dark">
                      <CalendarCheck className="h-5 w-5" />
                    </div>
                    <h4 className="mt-4 font-display-bold text-lg text-dark">
                      You're booked!
                    </h4>
                    <p className="mt-2 font-body text-sm text-dark/70">
                      We've sent a confirmation to{" "}
                      <span className="text-gold-deep">{email}</span> for{" "}
                      <span className="text-gold-deep">{slot}</span>.
                    </p>
                    <button
                      data-cursor-hover
                      onClick={reset}
                      className="mt-5 font-mono-tag text-[10px] text-dark/60 underline-offset-4 hover:text-dark hover:underline"
                    >
                      Book another
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AppointmentBot;
