'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import Link from 'next/link'

type FAQItem = {
    id: string
    icon: IconName
    question: string
    answer: string
}

export default function FAQsThree() {
    const faqItems: FAQItem[] = [
        {
            id: 'item-1',
            icon: 'compass',
            question: 'What is Toolspick?',
            answer: 'Toolspick is a comprehensive directory of AI tools, SaaS products, and software alternatives. Our goal is to help you discover, compare, and choose the best tools to improve your workflow.',
        },
        {
            id: 'item-2',
            icon: 'upload',
            question: 'How can I submit my tool?',
            answer: 'You can submit your tool by clicking the "Submit Your Tool" button on our homepage. You\'ll need to fill out a form with details about your tool, including its name, description, website, and category.',
        },
        {
            id: 'item-3',
            icon: 'dollar-sign',
            question: 'Is it free to list a tool on Toolspick?',
            answer: 'Yes, basic listings on Toolspick are completely free. We also offer sponsored placements and featured listings for greater visibility. Please contact us for more information on our promotional packages.',
        },
        {
            id: 'item-4',
            icon: 'list-checks',
            question: 'How are tools reviewed and categorized?',
            answer: 'Our editorial team reviews each submission to ensure it meets our quality standards. Tools are then categorized based on their function and industry to make them easily discoverable for our users.',
        },
        {
            id: 'item-5',
            icon: 'filter',
            question: 'How can I find the best tools for my needs?',
            answer: 'You can use our powerful search and filtering options to narrow down tools by category, pricing, features, and user ratings. We also provide curated lists and comparisons to help you make an informed decision.',
        },
    ]

    return (
        <section className="bg-muted dark:bg-background py-20">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="flex flex-col gap-10 md:flex-row md:gap-16">
                    <div className="md:w-1/3">
                        <div className="sticky top-20">
                            <h2 className="mt-4 text-3xl font-bold">Frequently Asked Questions</h2>
                            <p className="text-muted-foreground mt-4">
                                Can&apos;t find what you&apos;re looking for? Contact our{' '}
                                <Link
                                    href="#"
                                    className="text-primary font-medium hover:underline">
                                    customer support team
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className="md:w-2/3">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-2">
                            {faqItems.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    value={item.id}
                                    className="bg-background shadow-xs rounded-lg border px-4 last:border-b">
                                    <AccordionTrigger className="cursor-pointer items-center py-5 hover:no-underline">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-6">
                                                <DynamicIcon
                                                    name={item.icon}
                                                    className="m-auto size-4"
                                                />
                                            </div>
                                            <span className="text-base">{item.question}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-5">
                                        <div className="px-9">
                                            <p className="text-base">{item.answer}</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    )
}
