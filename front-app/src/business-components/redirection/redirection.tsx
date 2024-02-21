"use client";

import { Flex, Text } from "@radix-ui/themes";
import styles from "./redirection.module.scss";
import { SVGProps, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoaderIcon from "@/atom-components/icon/loaderIcon";

interface RedirectionProps {
  path?: string;
}

const Redirection = ({ path = "/" }: RedirectionProps) => {
  const router = useRouter();

  useEffect(() => {
    router.push(path);
  }, []);

  return (
    <Flex align="center" justify="center" className={styles.container}>
      <Flex direction="column" align="center">
        <LoaderIcon className={styles.loading_icon} />
        <Flex direction="column" align="center">
          <Text className={styles.title}>잠시만 기다려주세요...</Text>
          <Text className={styles.subtitle}>
            새 페이지로 리다이렉션 중입니다.
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Redirection;
