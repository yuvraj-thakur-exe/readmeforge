'use client';

import { Text } from '#/components/atoms/text';

export function FooterOwner() {

  return (
    <div className="hidden h-full shrink-0 gap-sm desktop:flex">
      <img
        className="size-8 self-center"
        src="/logo.svg"
        alt="MonoForge"
      />

      <div className="flex flex-col h-full justify-center">
        <Text.Strong>MonoForge</Text.Strong>
        <Text.Small className="not-italic">
          Forge a GitHub profile that gets noticed.{' '}
          <Text.Link
            href="https://github.com/yuvraj-thakur-exe/MONOFORGE"
            target="_blank"
            rel="noreferrer"
            className="text-xs"
          >
            GitHub
          </Text.Link>
        </Text.Small>
      </div>
    </div>
  );
}
