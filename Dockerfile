FROM node:16-alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules

ARG DOMAIN
ARG NETWORK_ID
ARG CHAIN_ID
ARG TESTNET_RPC
ARG TESTNET_EXPLORER
ARG IPFS_GATEWAY
ARG GRAPH_QUERY_BASE_URL
ARG SUBGRAPH_NAME
ARG SECRET_COOKIE_PASSWORD

ENV NEXT_PUBLIC_LOCAL_DOMAIN $DOMAIN
ENV NEXT_PUBLIC_NETWORK_ID $NETWORK_ID
ENV NEXT_PUBLIC_TARGET_CHAIN_ID $CHAIN_ID
ENV NEXT_PUBLIC_TESTNET_RPC $TESTNET_RPC
ENV NEXT_PUBLIC_TESTNET_EXPLORER $TESTNET_EXPLORER
ENV NEXT_PUBLIC_IPFS_GATEWAY $IPFS_GATEWAY
ENV NEXT_PUBLIC_GRAPH_QUERY_BASE_URL $GRAPH_QUERY_BASE_URL
ENV NEXT_PUBLIC_SUBGRAPH_NAME $SUBGRAPH_NAME
ENV SECRET_COOKIE_PASSWORD $SECRET_COOKIE_PASSWORD

RUN npm run build

# Production image
FROM node:16-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# If you are using a custom next.config.js file, uncomment this line.
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "run", "start"]