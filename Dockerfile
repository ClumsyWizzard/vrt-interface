FROM node:16-alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci


# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run gen-contract-types

ARG DOMAIN
ARG NETWORK_ID
ARG CHAIN_ID
ARG TESTNET_RPC
ARG TESTNET_EXPLORER_URL
ARG IPFS_GATEWAY_URL
ARG GRAPH_QUERY_BASE_URL
ARG SUBGRAPH_NAME
ARG IPFS_API_URL

ENV NEXT_PUBLIC_LOCAL_DOMAIN $DOMAIN
ENV NEXT_PUBLIC_NETWORK_ID $NETWORK_ID
ENV NEXT_PUBLIC_TARGET_CHAIN_ID $CHAIN_ID
ENV NEXT_PUBLIC_TESTNET_RPC $TESTNET_RPC
ENV NEXT_PUBLIC_TESTNET_EXPLORER_URL $TESTNET_EXPLORER_URL
ENV NEXT_PUBLIC_IPFS_GATEWAY_URL $IPFS_GATEWAY_URL
ENV NEXT_PUBLIC_GRAPH_QUERY_BASE_URL $GRAPH_QUERY_BASE_URL
ENV NEXT_PUBLIC_SUBGRAPH_NAME $SUBGRAPH_NAME
ENV NEXT_PUBLIC_IPFS_API_URL $IPFS_API_URL

RUN npm run build

# Production image
FROM node:16-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# If you are using a custom next.config.js file, uncomment this line.

COPY --from=builder /app ./
COPY --from=builder /app/node_modules/vrt-core/artifacts/ ./public/contracts/

EXPOSE 3000

CMD ["npm", "run", "start"]