import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'

type Props = {
  params: Promise<{
    legal: string
  }>
}

export default async function LegalPage({ params }: Props) {
  const { legal } = await params

  if (legal !== 'terms' && legal !== 'policy') {
    notFound()
  }

  const document =
    legal === 'terms'
      ? await prisma.termsPolicy.findFirst({
          orderBy: {
            updatedAt: 'desc'
          }
        })
      : await prisma.privacyPolicy.findFirst({
          orderBy: {
            updatedAt: 'desc'
          }
        })

  if (!document) {
    notFound()
  }

  return (
    <section className="container pt-10">
      <div
        className="text-foreground [&_a]:text-primary [&_li]:text-muted-foreground [&_p]:text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold [&_li]:leading-7 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-4 [&_p]:leading-7 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6"
        dangerouslySetInnerHTML={{ __html: document.content }}
      />
    </section>
  )
}
