# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source

# Copy csproj correctly
COPY Rets-API/Rets-API.csproj ./Rets-API/
WORKDIR /source/Rets-API
RUN dotnet restore

# Copy the rest of the API project
COPY Rets-API/. ./
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

# Listen on Render's expected port
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "Rets-API.dll"]
