import { Sparkles, MessageCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion-primitives";
import { addons, printCatalog, waLink, bookMsg } from "@/lib/data";

export default function AddonsPrint() {
  return (
    <section id="addons" data-testid="addons-section" className="relative py-28 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          align="center"
          overline="Add-ons · Cetak & Album"
          title={
            <>
              Sempurnakan dengan <span className="italic text-gold">sentuhan ekstra</span>
            </>
          }
          description="Lengkapi paket Anda dengan layanan tambahan, atau abadikan dalam bentuk cetak & album premium."
        />

        <Reveal delay={0.2}>
          <Tabs defaultValue="addons" className="mt-14">
            <TabsList
              data-testid="addons-tabs-list"
              className="mx-auto flex w-fit rounded-full border border-white/10 bg-card p-1.5"
            >
              <TabsTrigger
                data-testid="tab-addons"
                value="addons"
                className="rounded-full px-7 py-2.5 font-mono text-xs uppercase tracking-[0.2em] data-selected:bg-gold data-selected:text-[#0B0C0E]"
              >
                Add-ons
              </TabsTrigger>
              <TabsTrigger
                data-testid="tab-cetak"
                value="cetak"
                className="rounded-full px-7 py-2.5 font-mono text-xs uppercase tracking-[0.2em] data-selected:bg-gold data-selected:text-[#0B0C0E]"
              >
                Cetak & Album
              </TabsTrigger>
            </TabsList>

            <TabsContent value="addons" className="mt-12">
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {addons.map((item, i) => (
                  <Reveal key={item.id} delay={i * 0.08} className="h-full">
                    <article
                      data-testid={`addon-card-${item.id}`}
                      className="group flex h-full flex-col rounded-3xl border border-white/10 bg-card p-7 transition-colors duration-300 hover:border-gold/40"
                    >
                      <span className="grid h-11 w-11 place-items-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                        <Sparkles size={17} />
                      </span>
                      <h3 className="mt-5 font-heading text-xl font-medium text-stone-100">{item.name}</h3>
                      <p data-testid={`addon-price-${item.id}`} className="mt-2 font-heading text-2xl font-semibold text-gold-gradient">
                        {item.price}
                      </p>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-400">{item.detail}</p>
                      <a
                        data-testid={`addon-wa-${item.id}`}
                        href={waLink(bookMsg(`Add-on ${item.name}`, item.price))}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-transform duration-300 hover:translate-x-1"
                      >
                        <MessageCircle size={15} />
                        Tanya via WhatsApp
                      </a>
                    </article>
                  </Reveal>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cetak" className="mt-12">
              <div
                data-testid="print-catalog-table"
                className="overflow-hidden rounded-3xl border border-white/10 bg-card"
              >
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableHead className="px-7 py-5 font-mono text-[11px] uppercase tracking-[0.25em] text-gold">Item</TableHead>
                      <TableHead className="px-7 py-5 font-mono text-[11px] uppercase tracking-[0.25em] text-gold">Detail</TableHead>
                      <TableHead className="px-7 py-5 text-right font-mono text-[11px] uppercase tracking-[0.25em] text-gold">Harga</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {printCatalog.map((item) => (
                      <TableRow
                        key={item.id}
                        data-testid={`print-row-${item.id}`}
                        className="border-white/10 transition-colors hover:bg-gold/5"
                      >
                        <TableCell className="px-7 py-5 font-heading text-lg font-medium text-stone-100">
                          {item.name}
                        </TableCell>
                        <TableCell className="max-w-md px-7 py-5 text-sm leading-relaxed text-stone-400">
                          {item.detail}
                        </TableCell>
                        <TableCell
                          data-testid={`print-price-${item.id}`}
                          className="whitespace-nowrap px-7 py-5 text-right font-heading text-xl font-semibold text-gold-gradient"
                        >
                          {item.price}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </Reveal>
      </div>
    </section>
  );
}
